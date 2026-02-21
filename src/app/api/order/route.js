import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile({ token, ip }) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        throw new Error('Missing TURNSTILE_SECRET_KEY');
    }

    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (ip) formData.append('remoteip', ip);

    const res = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            body: formData,
        }
    );

    const data = await res.json();
    return data; // { success, error-codes, ... }
}

export async function POST(req) {
    try {
        const body = await req.json();

        // Honeypot: if filled, treat as spam
        if (body.company && body.company.trim().length > 0) {
            return NextResponse.json(
                { error: 'Spam detected' },
                { status: 400 }
            );
        }

        // Turnstile token required
        if (
            !body.turnstileToken ||
            String(body.turnstileToken).trim().length < 10
        ) {
            return NextResponse.json(
                { error: 'Turnstile verification required' },
                { status: 400 }
            );
        }

        // Verify Turnstile BEFORE doing anything expensive
        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            req.headers.get('x-real-ip') ||
            undefined;

        const verification = await verifyTurnstile({
            token: body.turnstileToken,
            ip,
        });

        if (!verification?.success) {
            return NextResponse.json(
                {
                    error: 'Turnstile verification failed',
                    details: verification?.['error-codes'] || [],
                },
                { status: 400 }
            );
        }

        // Basic validation
        if (!body.name || !body.name.trim() || !isValidEmail(body.email)) {
            return NextResponse.json(
                { error: 'Invalid name or email' },
                { status: 400 }
            );
        }

        const to = process.env.ORDER_TO_EMAIL;
        const from = process.env.ORDER_FROM_EMAIL;
        const resendKey = process.env.RESEND_API_KEY;

        if (!to || !from || !process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: 'Server email config missing' },
                { status: 500 }
            );
        }

        const resend = new Resend(resendKey);

        const subject = `T-Shirt Order Request — ${body.name} (${body.size}/${body.color})`;

        const text = [
            'New T-Shirt order request:',
            '',
            `Name: ${body.name}`,
            `Email: ${body.email}`,
            `Size: ${String(body.size).toUpperCase()}`,
            `Color: ${body.color}`,
            body.notes && body.notes.trim()
                ? `Notes: ${body.notes.trim()}`
                : 'Notes: (none)',
            '',
            'Reply to this email to coordinate details.',
        ].join('\n');

        const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
        <h2 style="margin:0 0 12px 0;">New T-Shirt order request</h2>
        <ul style="padding-left:18px; margin:0 0 12px 0;">
          <li><strong>Name:</strong> ${escapeHtml(body.name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(body.email)}</li>
          <li><strong>Size:</strong> ${escapeHtml(String(body.size).toUpperCase())}</li>
          <li><strong>Color:</strong> ${escapeHtml(body.color)}</li>
        </ul>
        <p style="margin:0;"><strong>Notes:</strong><br/>${escapeHtml(body.notes?.trim() || '(none)')}</p>
      </div>
    `;

        const { error } = await resend.emails.send({
            from,
            to,
            replyTo: body.email,
            subject,
            text,
            html,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json(
            { error: err?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}

function escapeHtml(input) {
    return String(input)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
        .replaceAll('\n', '<br/>');
}
