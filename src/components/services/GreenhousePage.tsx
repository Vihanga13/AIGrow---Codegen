import ServicePageLayout from './ServicePageLayout';
import { PageId } from '../../types';

interface PageProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function GreenhousePage(props: PageProps) {
  return <ServicePageLayout serviceId="greenhouse" {...props} />;
}
