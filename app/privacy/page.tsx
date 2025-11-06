export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
        
        <p className="text-sm text-gray-600 mb-8">
          <strong>Last Updated:</strong> November 6, 2025
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <p>
            This Privacy Policy describes how <a href="https://ytrust.vercel.app/" className="text-red-600 hover:underline">https://ytrust.vercel.app/</a> ("we," "us," or "our") collects, uses, and shares your information when you use our service, which connects to your YouTube channels using the YouTube API Services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We use the YouTube API Services to access data from your connected YouTube account. We collect the following types of information:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 my-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Specific Data Points</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose of Collection</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">YouTube Account Information</td>
                  <td className="border border-gray-300 px-4 py-2">YouTube Channel Name, Channel ID.</td>
                  <td className="border border-gray-300 px-4 py-2">To identify the channels and display data accurately.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">YouTube Analytics Data</td>
                  <td className="border border-gray-300 px-4 py-2">Views, Estimated Revenue/Earnings, Subscriber counts, Watch Time, and other performance metrics (as accessed via the API).</td>
                  <td className="border border-gray-300 px-4 py-2">To provide the core functionality of our service, which is to analyze and present your channel performance.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Authentication Data</td>
                  <td className="border border-gray-300 px-4 py-2">OAuth Access Tokens and Refresh Tokens.</td>
                  <td className="border border-gray-300 px-4 py-2">To maintain your connection to Google and refresh data without repeated sign-in. Note: We do not store your Google password.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information (Limited Use Disclosure)</h2>
          <p>
            Our use of information received from the YouTube API Services will adhere to the Google API Services User Data Policy, including the requirements for Limited Use. We use your data strictly for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>To Provide Services:</strong> To display YouTube analytics, revenue, and performance reports on your dashboard.</li>
            <li><strong>To Improve Services:</strong> To analyze the overall usage patterns of our application (aggregated and anonymized where possible) to improve features and functionality.</li>
            <li><strong>Account Management:</strong> To manage and authenticate your connection to your YouTube account.</li>
          </ul>
          <p>
            We do not share, sell, or disclose your YouTube user data to third parties, except as necessary to provide the service (e.g., storing data on a secure server) or as required by law.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Data Storage and Security</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Storage Location:</strong> Your data is stored securely on Vercel's infrastructure.</li>
            <li><strong>Retention:</strong> We retain your data for as long as your account is active or as needed to provide you with the services. If you terminate your account, we will delete your collected data within 30 days, unless legally required to retain it longer.</li>
            <li><strong>Security Measures:</strong> We use industry-standard security measures, including encryption and access control, to protect your data from unauthorized access.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Your Rights and Data Deletion</h2>
          <p>You have the right to revoke our access to your YouTube data at any time.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Revoking Access via Google:</strong> You can revoke https://ytrust.vercel.app/'s access directly through the Google Security Settings page: <a href="https://myaccount.google.com/permissions" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">https://myaccount.google.com/permissions</a>.</li>
            <li><strong>Data Deletion Request:</strong> You can request the deletion of all data we have collected about you by contacting us at <a href="mailto:lutinlutin76@gmail.com" className="text-red-600 hover:underline">lutinlutin76@gmail.com</a>. We will confirm the deletion of your data within 7 business days.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Compliance with YouTube API Services</h2>
          <p>
            By using our service, you agree to be bound by the YouTube Terms of Service (TOS) and the Google Privacy Policy.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>YouTube TOS Link:</strong> <a href="https://www.youtube.com/t/terms" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.youtube.com/t/terms</a></li>
            <li><strong>Google Privacy Policy Link:</strong> <a href="https://policies.google.com/privacy" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:lutinlutin76@gmail.com" className="text-red-600 hover:underline">lutinlutin76@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
