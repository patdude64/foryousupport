-- Site content table for editable website elements
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text', -- text, image, color, number
  text_value TEXT,
  image_url TEXT,
  color_value TEXT,
  number_value NUMERIC,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can read site content" 
  ON site_content FOR SELECT 
  USING (true);

-- Only authenticated admins can modify (we'll check admin status in the app)
CREATE POLICY "Authenticated users can insert site content" 
  ON site_content FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site content" 
  ON site_content FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can delete site content" 
  ON site_content FOR DELETE 
  TO authenticated 
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_content_updated_at 
  BEFORE UPDATE ON site_content 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default content
INSERT INTO site_content (section, key, content_type, text_value) VALUES
  ('hero', 'tagline', 'text', 'Helping NDIS participants navigate their plans, connect with the right providers, and build the life they choose.'),
  ('hero', 'cta_text', 'text', 'Get Started'),
  ('services', 'title', 'text', 'Our Support Coordination Services'),
  ('services', 'subtitle', 'text', 'We provide comprehensive NDIS support coordination to help you make the most of your plan.'),
  ('stories', 'title', 'text', 'Client Stories'),
  ('stories', 'subtitle', 'text', 'See how we''ve helped NDIS participants and their families achieve their goals.'),
  ('about', 'title', 'text', 'About Us'),
  ('about', 'paragraph1', 'text', 'Our mission is to serve at the centre of community, caring, and family. At For You Support Coordination, we believe everyone deserves the opportunity to live their best life.'),
  ('about', 'paragraph2', 'text', 'Our experienced team works alongside NDIS participants to understand their unique goals, navigate the complexities of the NDIS, and connect them with quality services and supports in a caring and family-oriented environment.'),
  ('about', 'quote', 'text', 'We also seek to help you feel part of the community and ensure our process is streamlined over every part of your plan and responsibilities with current access.'),
  ('faq', 'title', 'text', 'Frequently Asked Questions'),
  ('faq', 'subtitle', 'text', 'Got questions? We''ve got answers. Here are some of the most common questions about our services.'),
  ('contact', 'title', 'text', 'Get in Touch'),
  ('contact', 'subtitle', 'text', 'Ready to start your NDIS journey or have questions about our services? We''d love to hear from you.'),
  ('contact', 'email', 'text', 'admin@foryou.au'),
  ('contact', 'phone', 'text', '0721 18648'),
  ('branding', 'primary_color', 'color', '#0d9488'),
  ('branding', 'secondary_color', 'color', '#0c3b5e'),
  ('branding', 'accent_color', 'color', '#e8964b')
ON CONFLICT (section, key) DO NOTHING;
