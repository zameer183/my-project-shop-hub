import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-muted rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Construction className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Services Page
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              This page is under construction. Our comprehensive healthcare
              services will be available here soon.
            </p>
            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>Coming Soon: Healthcare Services</CardTitle>
                <CardDescription>
                  What you can expect to find here:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Health consultations and advice</li>
                  <li>• Prescription management services</li>
                  <li>• Medication therapy management</li>
                  <li>• Health screenings and monitoring</li>
                  <li>• Insurance processing assistance</li>
                  <li>• Home delivery services</li>
                </ul>
              </CardContent>
            </Card>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
