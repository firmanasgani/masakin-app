import backgroundImage from "../../welcome-background.png";
import appLogo from "../../logo.svg";

export default function Welcome() {
  return (
    <div className="max-w-sm mx-auto">
      <div
        style={{
          backgroundImage: `url(${backgroundImage}),linear-gradient(0deg, rgba(0, 0, 0, 0.7) 20%, rgba(130, 105, 132, 0.404) 40%, rgba(255, 255, 255, 0) 100%)`,
        }}
        className="h-screen bg-cover bg-[40%_50%] bg-no-repeat bg-blend-overlay"
      >
        <div className="h-full flex justify-between flex-col">
          <div className="text-center pt-14">
            <img src={appLogo} alt="Masakin" className="inline-block" />
            <div className="rounded-full bg-[#9F1036] inline-block mt-2.5 text-white px-4 py-0.5">
              Rasa yang dicari, temukan di Masakin
            </div>
          </div>

          <div className="text-center pb-12 text-white">
            <h1 className="text-4xl font-semibold mb-2">Start Cooking!</h1>
            <p className="text-xl inline-block w-52 mb-6">
              Explore curated recipes from all over the world!
            </p>
            <a
              href="#"
              className="rounded-md inline-block w-60 py-2.5 px-6 align-middle bg-[#7E9F10] text-2xl"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
