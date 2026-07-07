import { Component, createSignal, For, Match, Switch } from "solid-js";
import { text } from "@constants/text";
import LazyImage from "@components/LazyImage";
import Tabs from "@components/Tabs";
import Container from "@components/Container";
import InstallStep1 from "@assets/images/tutorial/install-step1.png";
import InstallStep2 from "@assets/images/tutorial/install-step2.png";
import InstallStep3 from "@assets/images/tutorial/install-step3.png";
import RedeemStep1 from "@assets/images/tutorial/redeem-step1.png";
import RedeemStep2 from "@assets/images/tutorial/redeem-step2.png";
import RedeemStep3 from "@assets/images/tutorial/redeem-step3.png";
import RedeemStep4 from "@assets/images/tutorial/redeem-step4.png";
import UseStep1 from "@assets/images/tutorial/use-step1.png";
import UseStep2 from "@assets/images/tutorial/use-step2.png";
import UseStep3 from "@assets/images/tutorial/use-step3.png";

interface TutorialStep {
  number: number;
  text: string;
  image?: string;
  imageResolution?: string;
  note?: string;
}

const Tutorial: Component = () => {
  const [activeTab, setActiveTab] = createSignal("install");

  const installSteps = (): TutorialStep[] => [
    {
      number: 1,
      text: text.tutorial.installStep1,
      image: InstallStep1,
      imageResolution: "32/9",
    },
    {
      number: 2,
      text: text.tutorial.installStep2,
      image: InstallStep2,
      imageResolution: "66/43",
    },
    {
      number: 3,
      text: text.tutorial.installStep3,
      image: InstallStep3,
      imageResolution: "2/1",
    },
  ];

  const redeemSteps = (): TutorialStep[] => [
    {
      number: 1,
      text: text.tutorial.redeemStep1,
      image: RedeemStep1,
      imageResolution: "2/1",
    },
    {
      number: 2,
      text: text.tutorial.redeemStep2,
      image: RedeemStep2,
      imageResolution: "1/1",
    },
    {
      number: 3,
      text: text.tutorial.redeemStep3,
      image: RedeemStep3,
      imageResolution: "1/1",
    },
    {
      number: 4,
      text: text.tutorial.redeemStep4,
      image: RedeemStep4,
      imageResolution: "4/1",
    },
  ];

  const useSteps = (): TutorialStep[] => [
    {
      number: 0,
      text: text.tutorial.useIntro,
    },
    {
      number: 1,
      text: text.tutorial.useStep1,
      image: UseStep1,
      imageResolution: "2/1",
    },
    {
      number: 2,
      text: text.tutorial.useStep2,
      image: UseStep2,
      imageResolution: "2/1",
    },
    {
      number: 3,
      text: text.tutorial.useStep3,
      image: UseStep3,
      imageResolution: "2/1",
    },
    {
      number: 0,
      text: text.tutorial.useFinal,
    },
  ];

  const tabs = () => [
    { key: "install", label: text.tutorial.installTab, value: "install" },
    { key: "redeem", label: text.tutorial.redeemTab, value: "redeem" },
    { key: "use", label: text.tutorial.useTab, value: "use" },
  ];

  const renderSteps = (steps: TutorialStep[], note?: string) => (
    <div class="space-y-6 sm:space-y-8">
      <For each={steps}>
        {(step) => (
          <div class="space-y-3 sm:space-y-4">
            <div class="flex items-start gap-3 sm:gap-4">
              {step.number > 0 && (
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  {step.number}
                </div>
              )}
              <div class="flex-1 pt-1 sm:pt-2">
                <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {step.text}
                </p>

                {step.note && (
                  <div class="mt-3 p-3 sm:p-4 bg-gray-100 rounded-lg border border-gray-200">
                    <p class="text-xs sm:text-sm font-mono text-gray-700 break-all">
                      {step.note}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {step.image && (
              <div class={step.number > 0 ? "ml-0 sm:ml-14" : ""}>
                <LazyImage
                  src={step.image}
                  alt={`Tutorial step ${step.number > 0 ? step.number : "intro"}`}
                  class="shadow-sm"
                  aspectRatio={
                    step.imageResolution ? step.imageResolution : "16/9"
                  }
                />
              </div>
            )}
          </div>
        )}
      </For>

      {note && (
        <div class="p-4 sm:p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <div class="flex items-start gap-2 sm:gap-3">
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p class="text-xs sm:text-sm font-semibold text-blue-900 mb-1">
                Note:
              </p>
              <p class="text-xs sm:text-sm text-blue-800 leading-relaxed">
                {note}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <section class="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-3xl mx-auto text-center px-4">
            <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 rounded-full mb-4">
              <svg
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span class="text-[10px] sm:text-xs font-semibold text-primary-600 uppercase tracking-wider">
                Tutorial Guide
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              {text.tutorial.title}
            </h1>
            <p class="text-base sm:text-lg text-gray-500 leading-relaxed">
              {text.tutorial.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section class="py-12 bg-white">
        <Container>
          <div class="max-w-4xl mx-auto">
            <Tabs
              tabs={tabs()}
              activeTab={activeTab()}
              onTabChange={setActiveTab}
            >
              <Switch>
                <Match when={activeTab() === "install"}>
                  {renderSteps(installSteps(), text.tutorial.installNote)}
                </Match>
                <Match when={activeTab() === "redeem"}>
                  {renderSteps(redeemSteps(), text.tutorial.redeemNote)}
                </Match>
                <Match when={activeTab() === "use"}>
                  {renderSteps(useSteps(), text.tutorial.useNote)}
                </Match>
              </Switch>
            </Tabs>
          </div>
        </Container>
      </section>

      <section class="py-12 bg-gray-50">
        <Container>
          <div class="max-w-2xl mx-auto">
            <div class="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  class="w-8 h-8 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {text.tutorial.needHelp}
              </h3>
              <p class="text-gray-600 mb-6">{text.tutorial.needHelpDesc}</p>
              <a
                href="/contact"
                class="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                {text.tutorial.contactUs}
                <svg
                  class="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Tutorial;
