import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import TemplatePreview from "../components/TemplatePreview/TemplatePreview";

const Page = () => {
  return (
    <ErrorBoundary>
      <TemplatePreview />
    </ErrorBoundary>
  );
};

export default Page;
