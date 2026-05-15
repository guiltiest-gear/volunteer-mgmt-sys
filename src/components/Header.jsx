import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

  return (
    <div class="navbar">
      <div class="logo">
        <a href="/">Volunteer Management</a>
      </div>
      <div class="nav-links">
        <a href="/" class={url == "/" ? "active" : undefined}>
          Home
        </a>
        <a href="/signin" class={url == "/signin" ? "active" : undefined}>
          Sign In
        </a>
        <a href="/signup" class={url == "/signup" ? "active" : undefined}>
          Sign Up
        </a>
        <a href="/404" class={url == "/404" ? "active" : undefined}>
          404
        </a>
      </div>
    </div>
  );
}
