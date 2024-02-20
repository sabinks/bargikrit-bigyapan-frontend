import React from 'react'

function PrivacyPolicy() {
    return (
        <div className="">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-4">
                    At Ad Zoner or Bargikrit Bigyapan, we are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our advertisement portal
                </p>

                <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>

                <p className="mb-4">
                    We may collect the following information:
                </p>

                <ul className="list-disc list-inside mb-4">
                    <li>Personal Information: When you register for an account or post an advertisement on our portal, we may collect personal information such as your name, email address, contact information, and payment details(not card information).</li>
                    <li>Advertisement Information: We collect information related to the advertisements you post on our portal, including content, images, duration, and targeting preferences.</li>
                    <li>Usage Information: We automatically collect information about your interactions with our portal, including the pages you visit, the advertisements you view, and your interactions with advertisements.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-2">How We Use the Information</h2>

                <p className="mb-4">
                    We require this information to understand your needs and provide you with a better service, and in
                    particular
                    for
                    the following reasons:
                </p>

                <ul className="list-disc list-inside mb-4">
                    <li>Provide Services: We use your personal and advertising information to provide our advertisement portal services, including facilitating advertisement posting, managing accounts, and processing payments.</li>
                    <li>Improve Services: We use usage information to analyze trends, monitor the effectiveness of advertisements, and improve the functionality and user experience of our portal.</li>
                    <li>Communication: We may use your contact information to communicate with you about your account, advertisements, updates to our services, and promotional offers.</li>
                    <li>Sending promotional: We may send emails about new products, special offers, or other information which we think you may find interesting.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-2">How We Use the Information</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>
                        Third-Party Service Providers: We may share your information with third-party service providers who assist us in operating our portal, processing payments, analyzing data, and delivering advertisements.
                    </li>
                    <li>
                        Legal Compliance: We may disclose your information when required by law, regulation, legal process, or government request, or to protect the rights, property, or safety of Advertisement House, our users, or others.
                    </li>
                    <li>
                        Business Transfers: In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction.
                    </li>
                </ul>

                <h2 className="text-2xl font-bold mb-2">Security</h2>

                <ul className="list-disc list-inside mb-4">
                    <li>
                        We implement appropriate technical and organizational measures to protect your information against unauthorized access, disclosure, alteration, or destruction.
                    </li>
                    <li>
                        Despite our efforts, no security measure is impenetrable, and we cannot guarantee the security of your information.
                    </li>
                </ul>

                {/* <h2 className="text-2xl font-bold mb-2">Cookies</h2>

                <p className="mb-4">
                    A cookie is a small file that asks permission to be placed on your computer's hard drive. Once you agree,the file
                    is added, and the cookie helps analyze web traffic or lets you know when you visit a particular site.
                    Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your
                    needs, likes, and dislikes by gathering and remembering information about your preferences.
                </p> */}

                {/* <p className="mb-4">
                    Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find
                    useful
                    and which you do not. A cookie in no way gives us access to your computer or any information about you,
                    other
                    than
                    the data you choose to share with us.
                </p> */}

                <h2 className="text-2xl font-bold mb-2">Your Choices</h2>

                <p className="mb-4">
                    Our portal is not intended for individuals under the age of 18, and we do not knowingly collect personal information from children.
                </p>

                <h2 className="text-2xl font-bold mb-2">Changes to this Privacy Policy</h2>

                <p className="mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on our portal or by other means.
                </p>
                <h2 className="text-2xl font-bold mb-2">Contact Us</h2>

                <p className="mb-4">If you have any questions, concerns, or complaints about our Privacy Policy or practices, please contact us at <span className='border-b-[1px] border-dotted'>info@adzoner.com</span>.</p>

                <p className="mb-4">
                    By using Advertisement House's portal, you agree to the collection and use of your information in accordance with this Privacy Policy and the terms and conditions are regularly subject to update.
                </p>
            </div>
        </div>
    )
}

export default PrivacyPolicy