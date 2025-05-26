import styles from "./products/styles.module.css";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>ヘッダー</header>
      <div className={styles.container}>
        <nav className={styles.navbar}>サイドバー</nav>
        <main className={styles.content}>
          <section>{children}</section>
        </main>
      </div>
      <footer className={styles.footer}>フッター</footer>
    </div>
  );
}
