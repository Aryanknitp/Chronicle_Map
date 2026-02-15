import MainLayout from '../layouts/MainLayout';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Privacy Policy</h1>
          <p className="text-stone-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-stone-700 leading-relaxed">
              At ChronicleMap, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Database className="w-6 h-6 text-amber-700 mr-3" />
            <h2 className="text-2xl font-serif font-bold text-stone-900">Information We Collect</h2>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Account Information</h3>
                <p className="text-stone-600">Name, email address, and password when you create an account.</p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Contributed Content</h3>
                <p className="text-stone-600">Photos, documents, audio, video, and associated metadata you upload.</p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Usage Data</h3>
                <p className="text-stone-600">Information about how you interact with the platform, including pages visited and features used.</p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">Location Data</h3>
                <p className="text-stone-600">Geographic information you provide when pinning content to locations.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How We Use Your Information */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-amber-700 mr-3" />
            <h2 className="text-2xl font-serif font-bold text-stone-900">How We Use Your Information</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To provide and maintain the ChronicleMap service</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To process and display your contributed content</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To communicate with you about your account and contributions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To improve and optimize the platform</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>To ensure compliance with our terms and community guidelines</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Data Security */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-amber-700 mr-3" />
            <h2 className="text-2xl font-serif font-bold text-stone-900">Data Security</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-stone-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access controls and authentication measures</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Secure backup and disaster recovery procedures</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Your Rights */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 text-amber-700 mr-3" />
            <h2 className="text-2xl font-serif font-bold text-stone-900">Your Rights</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-stone-600 mb-4">You have the right to:</p>
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access and review your personal data</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Correct inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Request deletion of your account and data</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Export your contributed content</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Opt out of non-essential communications</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Important Note */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-700 mr-3" />
            <h2 className="text-2xl font-serif font-bold text-stone-900">Public Content</h2>
          </div>
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <p className="text-stone-700">
                Please note that content you contribute to ChronicleMap (photos, documents, stories, etc.) is made publicly available as part of our community archive. While your account information remains private, your contributed content and associated metadata (location, date, attribution) will be visible to all users.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-stone-900 mb-3">Contact Us</h3>
            <p className="text-stone-600 mb-4">
              If you have questions about this Privacy Policy or how we handle your data, please contact us at:
            </p>
            <p className="text-stone-700 font-medium">privacy@chroniclemap.org</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;