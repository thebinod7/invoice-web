import Link from "next/link";

export default function LaunchLlamaBadge() {
    return (
        <Link
            href="https://launchllama.co?utm_source=badge&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://speaktechenglish.com/wp-content/uploads/2026/04/Screenshot_2026-04-09_at_17.40.44-removebg-preview.png"
                alt="Featured on Launch Llama"
                width={200}
                height={50}
            />
        </Link>
    );
}