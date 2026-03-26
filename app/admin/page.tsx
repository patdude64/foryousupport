"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

interface SiteContent {
  id: string;
  key: string;
  value: string;
  type: string;
  section: string;
  label: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<SiteContent[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }
      setUser(user);
      loadContent();
    };
    checkUser();
  }, []);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("section", { ascending: true });

    if (!error && data) {
      setContent(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const updateContent = (key: string, newValue: string) => {
    setContent(prev =>
      prev.map(item =>
        item.key === key ? { ...item, value: newValue } : item
      )
    );
  };

  const saveChanges = async () => {
    setSaving(true);
    setMessage(null);

    for (const item of content) {
      const { error } = await supabase
        .from("site_content")
        .update({ value: item.value, updated_at: new Date().toISOString() })
        .eq("key", item.key);

      if (error) {
        setMessage(`Error saving ${item.label}: ${error.message}`);
        setSaving(false);
        return;
      }
    }

    setMessage("All changes saved successfully!");
    setSaving(false);
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Website Admin</h1>
          <p className={styles.subtitle}>Manage your website content</p>
        </div>
        <div className={styles.headerRight}>
          <a href="/" className={styles.viewSiteBtn} target="_blank">
            View Site
          </a>
          <button onClick={handleSignOut} className={styles.signOutBtn}>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {message && (
          <div className={message.includes("Error") ? styles.errorMessage : styles.successMessage}>
            {message}
          </div>
        )}

        {Object.entries(groupedContent).map(([section, items]) => (
          <section key={section} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section}</h2>
            <div className={styles.fieldsGrid}>
              {items.map((item) => (
                <div key={item.key} className={styles.field}>
                  <label className={styles.fieldLabel}>{item.label}</label>
                  {item.type === "text" && (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateContent(item.key, e.target.value)}
                      className={styles.input}
                    />
                  )}
                  {item.type === "textarea" && (
                    <textarea
                      value={item.value}
                      onChange={(e) => updateContent(item.key, e.target.value)}
                      className={styles.textarea}
                      rows={3}
                    />
                  )}
                  {item.type === "color" && (
                    <div className={styles.colorField}>
                      <input
                        type="color"
                        value={item.value}
                        onChange={(e) => updateContent(item.key, e.target.value)}
                        className={styles.colorInput}
                      />
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => updateContent(item.key, e.target.value)}
                        className={styles.colorText}
                      />
                    </div>
                  )}
                  {item.type === "number" && (
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => updateContent(item.key, e.target.value)}
                      className={styles.input}
                      min="0"
                      max="100"
                      step="5"
                    />
                  )}
                  {item.type === "image" && (
                    <div className={styles.imageField}>
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => updateContent(item.key, e.target.value)}
                        className={styles.input}
                        placeholder="Image URL"
                      />
                      {item.value && (
                        <img src={item.value} alt="Preview" className={styles.imagePreview} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className={styles.saveBar}>
          <button
            onClick={saveChanges}
            disabled={saving}
            className={styles.saveBtn}
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}
