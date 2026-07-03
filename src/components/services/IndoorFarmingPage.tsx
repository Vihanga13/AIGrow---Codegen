import ServicePageLayout from './ServicePageLayout';
import { PageId } from '../../types';

interface PageProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function IndoorFarmingPage(props: PageProps) {
  return <ServicePageLayout serviceId="indoor-farming" {...props} />;
}
