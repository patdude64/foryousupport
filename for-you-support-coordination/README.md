# For You Support Co-ordination - Website

A fully customizable NDIS support coordination website with an admin panel for easy content management.

## Features

- ✨ **Fully Customizable**: Edit all content via simple admin panel
- 🎨 **Dynamic Colors**: Change your brand colors in real-time
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast & Lightweight**: Single HTML file with embedded CSS/JS
- 🔧 **No Build Required**: Just edit `config.json` and refresh
- 📊 **Admin Dashboard**: Beautiful interface for managing all content
- 🎯 **NDIS Focused**: Pre-built with NDIS support coordination in mind

## Quick Start

### View the Website
1. Open `index.html` in your browser
2. The site will automatically load `config.json`
3. All content is customizable via the admin panel

### Access Admin Panel
1. Open `admin.html` in your browser
2. Edit all site content through the form interface
3. Colors update in real-time
4. Click "Save Changes" to download updated config
5. Replace `config.json` in your project with the new version

## Configuration

All site content is controlled by `config.json`:

```json
{
  "site": {
    "name": "For You Support Co-ordination",
    "phone": "1300 000 000",
    "email": "hello@foryousupport.com.au",
    ...
  },
  "colors": {
    "primary": "#0d9488",
    ...
  },
  "services": [...],
  "team": [...],
  "testimonials": [...]
}
```

### Customizing Content

#### Site Settings
- Name, tagline, description
- Contact info (phone, email, address, hours)

#### Colors
- Primary color (buttons, links, accents)
- Text colors (dark/light)
- Background colors

#### Sections
- **Hero**: Title, subtitle, stats
- **About**: Title, description, features
- **Services**: Up to 6 services with icons
- **Team**: Team members with bios
- **Testimonials**: Customer testimonials with ratings

## File Structure

```
.
├── index.html          # Main website (loads config.json)
├── admin.html          # Admin panel for editing content
├── config.json         # All site content and colors
└── README.md           # This file
```

## Deployment

### Vercel (Recommended)
1. Push this folder to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Deploy (takes ~1 minute)
5. Your site is now live at `yourproject.vercel.app`

### Other Platforms
The site works on any static hosting:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3
- Traditional web hosting

## Making Changes

### In the Admin Panel
1. Open `admin.html`
2. Edit any content using the form fields
3. See changes in real-time
4. Click "Save Changes" to download `config.json`
5. Replace the old `config.json` with the new one
6. Refresh `index.html` to see changes

### Direct JSON Editing
Edit `config.json` directly in your code editor, then refresh the browser.

## Admin Panel Features

- **Tabbed Interface**: Organized sections for different content
- **Color Picker**: Visual color selection with hex input
- **Live Updates**: See changes as you type
- **JSON Editor**: View and edit raw JSON
- **Download Config**: Export your configuration for backup

## Tips

- Use emojis for service icons (e.g., 📋, 🏠, 🤝)
- Keep titles short and punchy
- Descriptions should be 1-2 sentences
- Update stats monthly to show real metrics
- Add new team members by editing the JSON directly
- Customize colors to match your brand

## Support

For questions or issues, check the admin panel raw JSON editor to see your current configuration structure.

## License

This website is ready for commercial use. Customize and deploy freely.

---

Built with ❤️ for NDIS support coordination services.
