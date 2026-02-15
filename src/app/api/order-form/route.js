import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Honeypot: if filled, treat as spam
    if (body.company && body.company.trim().length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    if (!body.name || !body.name.trim() || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid name or email' },
        { status: 400 }
      );
    }

    const to = process.env.ORDER_TO_EMAIL;
    const from = process.env.ORDER_FROM_EMAIL;

    if (!to || !from || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Server email config missing' },
        { status: 500 }
      );
    }

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
        <p style="margin:0;"><strong>Notes:</strong><br/>${
          escapeHtml(body.notes?.trim() || '(none)')
        }</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: body.email, // makes replying go to the buyer
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
