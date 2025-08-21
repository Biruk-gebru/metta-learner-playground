import React, { useCallback, useEffect, useState } from "react";
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
import dynamic from 'next/dynamic';

export default function ChapterPage() {
  const router = useRouter();
  const { slug } = router.query;
  const joined = Array.isArray(slug) ? slug.join("/") : slug;

  // Visual Editor temporarily disabled
  // const [showEditor, setShowEditor] = useState(false);
  // const [fileContent, setFileContent] = useState<string>("");
  // const [pageTitle, setPageTitle] = useState<string>("");

  // const openEditor = useCallback(async () => {
  //   if (!joined) return;
  //   try {
  //     const res = await fetch(`/api/content/get?slug=${joined}`);
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || 'Failed to load content');
  //     setFileContent(data.content || "");
  //     // Guess a page title from slug
  //     setPageTitle(String(joined).split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Edit Page');
  //     setShowEditor(true);
  //   } catch (e) {
  //     console.error(e);
  //     alert('Failed to load page content for editing');
  //   }
  // }, [joined]);

  // const handleSaveDraft = useCallback(async (content: string) => {
  //   try {
  //     const payload = {
  //       title: pageTitle || 'Untitled Edit',
  //       content,
  //       slug: joined,
  //     };
  //     const res = await fetch('/api/contributions/save-draft', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(payload),
  //   });
  //   if (!res.ok) throw new Error(await res.text());
  //   setShowEditor(false);
  //   alert('Draft saved. An admin can open a PR from this draft.');
  // } catch (e: any) {
  //   alert(`Failed to save draft: ${e.message}`);
  // }
  // }, [joined, pageTitle]);

  const commonLayoutProps = {
    showEditButton: false, // Temporarily disabled
    onEditClick: () => {}, // Temporarily disabled
    pageTitle: "",
  } as const;

  // Render pages
  if (joined === "functional-programming") {
    return (
      <Layout headings={FunctionalProgrammingSectionHeadings} {...commonLayoutProps}>
        <div className="prose dark:prose-invert max-w-none">
          <FunctionalProgrammingSection />
        </div>
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "what-is-metta") {
    return (
      <Layout headings={WhatIsMettaSectionHeadings} {...commonLayoutProps}>
        <WhatIsMettaSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "nondeterminism") {
    return (
      <Layout headings={NonDeterminismSectionHeadings} {...commonLayoutProps}>
        <NonDeterminismSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "atomspace") {
    return (
      <Layout headings={AtomspaceSectionHeadings} {...commonLayoutProps}>
        <AtomspaceSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "standard-library") {
    return (
      <Layout headings={StdLibHighlightsSectionHeadings} {...commonLayoutProps}>
        <StdLibHighlightsSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "recursion") {
    return (
      <Layout headings={RecursionSectionHeadings} {...commonLayoutProps}>
        <RecursionSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "best-practices") {
    return (
      <Layout headings={BestPracticesSectionHeadings} {...commonLayoutProps}>
        <BestPracticesSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "installation") {
    return (
      <Layout headings={InstallationSectionHeadings} {...commonLayoutProps}>
        <InstallationSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "projects/family-tree") {
    return (
      <Layout headings={ProjectFamilyTreeSectionHeadings} {...commonLayoutProps}>
        <ProjectFamilyTreeSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "projects/python-integration") {
    return (
      <Layout headings={ProjectNondeterministicMathSectionHeadings} {...commonLayoutProps}>
        <ProjectNondeterministicMathSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "projects/neuro-symbolic") {
    return (
      <Layout headings={ProjectNeuroSymbolicSectionHeadings} {...commonLayoutProps}>
        <ProjectNeuroSymbolicSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  if (joined === "projects/list-utils") {
    return (
      <Layout headings={ProjectListUtilsSectionHeadings} {...commonLayoutProps}>
        <ProjectListUtilsSection />
        {showEditor && (
          <VisualEditor
            initialContent={fileContent}
            pageSlug={String(joined)}
            pageTitle={pageTitle}
            onSave={handleSaveDraft}
            onCancel={() => setShowEditor(false)}
          />
        )}
      </Layout>
    );
  }
  return (
    <Layout {...commonLayoutProps}>
      <div className="text-center text-red-500">Page not found.</div>
      {showEditor && (
        <VisualEditor
          initialContent={fileContent}
          pageSlug={String(joined || '')}
          pageTitle={pageTitle}
          onSave={handleSaveDraft}
          onCancel={() => setShowEditor(false)}
        />
      )}
    </Layout>
  );
}
