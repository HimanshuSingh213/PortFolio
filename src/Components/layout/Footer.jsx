import React from 'react';

export function Footer() {
    return (
        <footer className='mt-8 pt-12 pb-32 border-t border-t-neutral-600'>
            <div className='text-sm text-neutral-200 text-center font-geist'>
                Developed by @Himanshu Singh Dangi <br /> @{new Date().getFullYear()}. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;
