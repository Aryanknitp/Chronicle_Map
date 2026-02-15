import { useState } from 'react';
import { useNavigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Contact Us</h1>
          <p className="text-lg text-stone-600">
            Have questions, feedback, or want to get involved? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info Cards */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="w-10 h-10 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-stone-900 mb-2">Email</h3>
              <a href="mailto:contact@chroniclemap.org" className="text-stone-600 hover:text-amber-700 text-sm">
                contact@chroniclemap.org
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="w-10 h-10 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-stone-900 mb-2">Location</h3>
              <p className="text-stone-600 text-sm">
                Online Platform<br />
                Serving Communities Worldwide
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Send className="w-10 h-10 text-amber-700 mx-auto mb-3" />
              <h3 className="font-semibold text-stone-900 mb-2">Social</h3>
              <div className="flex justify-center space-x-3 text-sm">
                <a href="https://twitter.com" className="text-stone-600 hover:text-amber-700">Twitter</a>
                <span className="text-stone-400">•</span>
                <a href="https://github.com" className="text-stone-600 hover:text-amber-700">GitHub</a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 text-center">
            <strong>Demo Note:</strong> This is a frontend prototype. Contact form submission will be implemented with the backend API.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;