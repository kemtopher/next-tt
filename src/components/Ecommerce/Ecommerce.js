import React from 'react';
import Image from 'next/image';
import styles from './Ecommerce.module.css';
import { OrderForm } from '../OrderForm/OrderForm';

export const Ecommerce = ({ image, description, header }) => {
    return (
        <section className="min-h-[555px] relative py-0 sm:py-16 flex flex-col md:flex-row border-1 md:border-0 justify-between gap-4 md:gap-8 lg:gap-16 overflow-visible">
            <div className="w-full md:w-1/2 order-2 md:order-1">
                <OrderForm header={header} description={description} />
            </div>
            <div className="w-full md:w-1/2 min-w-[350px] order-1 md:order-2 flex items-start items-center relative">
                <Image
                    src="/price-sticker.png"
                    alt="sticker for shirt price"
                    width={200}
                    height={200}
                    className="absolute left-1/6 top-1/8 md:top-1/5 -translate-x-1/2 -translate-y-1/2 rotate-[-10deg]"
                />
                <Image
                    src={image.url}
                    alt={image.alt}
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                />
            </div>
        </section>
    );
};
