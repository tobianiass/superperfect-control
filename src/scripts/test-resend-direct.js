const { Resend } = require('resend');

async function testResend() {
    const resend = new Resend('re_KUT14u3k_NKUbVnWKMdaceNK3kJpKHJoN');
    
    try {
        console.log('Sending test email...');
        const result = await resend.emails.send({
            from: 'Controler <onboarding@resend.dev>',
            to: 'a.begas88@gmail.com',
            subject: 'Direct Test Email',
            html: '<h1>Direct Test</h1><p>Testing Resend directly</p>',
        });
        
        console.log('SUCCESS! Email sent:', result);
    } catch (error) {
        console.error('ERROR sending email:', error);
    }
}

testResend();
