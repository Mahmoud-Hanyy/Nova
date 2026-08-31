import { Component } from "react";

// If the model, Draco decoder, or environment map fails to load (flaky
// network, ad-blocker, offline dev, whatever) this contains the failure to
// the 3D area only. The rest of the page - nav, headline, copy, Shop, About
// - stays fully intact and readable.
export class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("3D scene failed to load:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="font-body text-sm text-stone/60 text-center max-w-xs">
            The 3D scene couldn't load. Everything else on the page still works.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
