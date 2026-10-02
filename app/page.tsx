import { Hero } from '@/components/sections/hero';
import { StudioIntro } from '@/components/sections/studio-intro';
import { Capabilities } from '@/components/sections/capabilities';
import { ThesisSection } from '@/components/sections/thesis';
import { VenturesSection } from '@/components/sections/ventures';
import { ProcessSection } from '@/components/sections/process';
import { EcosystemSection } from '@/components/sections/ecosystem';
import { PeopleSection } from '@/components/sections/people';
import { InsightsSection } from '@/components/sections/insights';
import { ClosingCta } from '@/components/sections/closing-cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <Capabilities index="02" />
      <ThesisSection index="03" />
      <VenturesSection index="04" />
      <ProcessSection index="05" />
      <EcosystemSection index="06" />
      <PeopleSection index="07" />
      <InsightsSection index="08" />
      <ClosingCta />
    </>
  );
}
