import Link from "@/components/link";
import DateYearInline from "@/components/date-year-inline";

export default function Footer() {
  return (
    <footer
      id="bottom"
      role="contentinfo"
      className="*:text-sm text-center shrink"
    >
      <p>Made with ❤️ in Canton, NC</p>
      <p>
        <a href="https://www.hustlelaunch.com/">Website Design</a> by Hustle
        Launch, <a href="https://www.hurleyus.com/">Marketing</a> by HurleyUS
      </p>
      <p>
        © Copyright 1999 - <DateYearInline /> Hustle Launch a HurleyUS Company,{" "}
        <em>All Rights Reserved</em>
      </p>
      <p>
        <a href="sitemap.xml">Sitemap</a> | <Link href="/privacy">Privacy</Link>{" "}
        | <Link href="/terms">Terms</Link>
      </p>
    </footer>
  );
}
