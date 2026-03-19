export default function Header({ postCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="brand-name">KindaPost</span>
        </div>
        <span className="post-counter">
          {postCount} {postCount === 1 ? "post" : "posts"}
        </span>
      </div>
    </header>
  );
}
