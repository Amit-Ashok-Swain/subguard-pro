import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-white/10 text-center flex flex-col items-center justify-center gap-2 relative z-10 w-full px-4">
      <p className="text-sm text-neutral-400 leading-relaxed">
        Built with{" "}
        <Heart
          size={14}
          className="inline-block mx-1 text-orange-500 fill-orange-500 relative -top-[1px]"
        />{" "}
        by Amit Ashok Swain for complete subscription control.
      </p>
      <p className="text-xs text-neutral-500">
        &copy; {new Date().getFullYear()} SubGuard Pro. All rights reserved.
      </p>
    </footer>
  );
}
