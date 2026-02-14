import { useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const GuidelinesPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Contribution Guidelines</h1>
          <p className="text-lg text-stone-600">
            Help us maintain the quality and integrity of our community archive by following these guidelines.
          </p>
        </div>

        {/* Content Guidelines */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              What We Accept
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">Historical Content</h3>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                <li>Photographs and images from any time period</li>
                <li>Historical documents, maps, and blueprints</li>
                <li>Oral histories and audio recordings</li>
                <li>Video footage of historical events or locations</li>
                <li>Personal stories and family histories</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">Quality Standards</h3>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                <li>Clear, legible images (minimum 800x600 pixels recommended)</li>
                <li>Accurate dates and locations to the best of your knowledge</li>
                <li>Proper attribution to original creators or sources</li>
                <li>Descriptive titles and context</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* What Not to Submit */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <XCircle className="w-5 h-5 mr-2 text-red-600" />
              What Not to Submit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-stone-600">
              <li>Copyrighted material without permission</li>
              <li>Content that violates privacy or includes identifiable individuals without consent</li>
              <li>Offensive, discriminatory, or hateful content</li>
              <li>Promotional or commercial material</li>
              <li>Spam or irrelevant content</li>
              <li>Content unrelated to local history or geography</li>
            </ul>
          </CardContent>
        </Card>

        {/* Rights and Licensing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-amber-700" />
              Rights and Licensing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-stone-600">
              By contributing content to ChronicleMap, you affirm that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-stone-600">
              <li>You own the content or have permission from the copyright holder</li>
              <li>You grant ChronicleMap a non-exclusive license to display, preserve, and distribute the content</li>
              <li>Your contribution will be made available under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 license</li>
              <li>You understand that content may be used for educational and preservation purposes</li>
            </ul>
          </CardContent>
        </Card>

        {/* Review Process */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
              Review Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-stone-600">
              All contributions are reviewed by our team of historians and community moderators to ensure quality and accuracy:
            </p>
            <ul className="list-disc list-inside space-y-2 text-stone-600">
              <li><strong>Initial Review:</strong> Usually completed within 2-5 business days</li>
              <li><strong>Verification:</strong> We may contact you for additional information</li>
              <li><strong>Approval:</strong> Approved content is published immediately</li>
              <li><strong>Feedback:</strong> If content needs adjustments, we'll provide guidance</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="bg-amber-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-serif font-bold mb-4">Ready to Contribute?</h2>
          <p className="mb-6 opacity-90">
            Follow these guidelines and help preserve local history for future generations.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/upload')}
            className="bg-white text-amber-800 hover:bg-stone-100"
          >
            Start Contributing
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuidelinesPage;