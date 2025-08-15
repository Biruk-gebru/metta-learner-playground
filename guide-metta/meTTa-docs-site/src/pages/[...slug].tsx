import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import FunctionalProgrammingSection, { FunctionalProgrammingSectionHeadings } from "../sections/FunctionalProgrammingSection";
import WhatIsMettaSection, { WhatIsMettaSectionHeadings } from "../sections/WhatIsMettaSection";
import NonDeterminismSection, { NonDeterminismSectionHeadings } from "../sections/NonDeterminismSection";
import AtomspaceSection, { AtomspaceSectionHeadings } from "../sections/AtomspaceSection";
import StdLibHighlightsSection, { StdLibHighlightsSectionHeadings } from "../sections/StdLibHighlightsSection";
import RecursionSection, { RecursionSectionHeadings } from "../sections/RecursionSection";
import BestPracticesSection, { BestPracticesSectionHeadings } from "../sections/BestPracticesSection";
import InstallationSection, { InstallationSectionHeadings } from "../sections/InstallationSection";
import ProjectFamilyTreeSection, { ProjectFamilyTreeSectionHeadings } from "../sections/ProjectFamilyTreeSection";
import ProjectNondeterministicMathSection, { ProjectNondeterministicMathSectionHeadings } from "../sections/ProjectNondeterministicMathSection";
import ProjectNeuroSymbolicSection, { ProjectNeuroSymbolicSectionHeadings } from "../sections/ProjectNeuroSymbolicSection";
import ProjectListUtilsSection, { ProjectListUtilsSectionHeadings } from "../sections/ProjectListUtilsSection";

export default function ChapterPage() {
  const router = useRouter();
  const { slug } = router.query;
  const joined = Array.isArray(slug) ? slug.join("/") : slug;

  if (joined === "functional-programming") {
    return (
      <Layout headings={FunctionalProgrammingSectionHeadings}>
        <div className="prose dark:prose-invert max-w-none">
          <FunctionalProgrammingSection />
        </div>
      </Layout>
    );
  }
  if (joined === "what-is-metta") {
    return (
      <Layout headings={WhatIsMettaSectionHeadings}>
        <WhatIsMettaSection />
      </Layout>
    );
  }
  if (joined === "nondeterminism") {
    return (
      <Layout headings={NonDeterminismSectionHeadings}>
        <NonDeterminismSection />
      </Layout>
    );
  }
  if (joined === "atomspace") {
    return (
      <Layout headings={AtomspaceSectionHeadings}>
        <AtomspaceSection />
      </Layout>
    );
  }
  if (joined === "standard-library") {
    return (
      <Layout headings={StdLibHighlightsSectionHeadings}>
        <StdLibHighlightsSection />
      </Layout>
    );
  }
  if (joined === "recursion") {
    return (
      <Layout headings={RecursionSectionHeadings}>
        <RecursionSection />
      </Layout>
    );
  }
  if (joined === "best-practices") {
    return (
      <Layout headings={BestPracticesSectionHeadings}>
        <BestPracticesSection />
      </Layout>
    );
  }
  if (joined === "installation") {
    return (
      <Layout headings={InstallationSectionHeadings}>
        <InstallationSection />
      </Layout>
    );
  }
  if (joined === "projects/family-tree") {
    return (
      <Layout headings={ProjectFamilyTreeSectionHeadings}>
        <ProjectFamilyTreeSection />
      </Layout>
    );
  }
  if (joined === "projects/python-integration") {
    return (
      <Layout headings={ProjectNondeterministicMathSectionHeadings}>
        <ProjectNondeterministicMathSection />
      </Layout>
    );
  }
  if (joined === "projects/neuro-symbolic") {
    return (
      <Layout headings={ProjectNeuroSymbolicSectionHeadings}>
        <ProjectNeuroSymbolicSection />
      </Layout>
    );
  }
  if (joined === "projects/list-utils") {
    return (
      <Layout headings={ProjectListUtilsSectionHeadings}>
        <ProjectListUtilsSection />
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="text-center text-red-500">Page not found.</div>
    </Layout>
  );
}
