import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__inner">
        <p className="kicker">404</p>
        <h1>Signal Lost</h1>
        <p className="not-found__text">
          This transmission does not exist in our galaxy. The page you are
          looking for has drifted into deep space.
        </p>
        <Link href="/" className="btn btn-primary">
          Return to Base
        </Link>
      </div>
    </div>
  );
}
