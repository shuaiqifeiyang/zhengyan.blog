import { get_files_metadata_in_a_folder } from "@/utils";
import HomePage from "@/components/ui/pages/homepage";
import config from "@/config/config";
export default async function Home() {
  const metadata = await get_files_metadata_in_a_folder("./md");
  metadata.sort((a, b) => {
    if (new Date(a.created_at!).getTime() < new Date(b.created_at!).getTime()) {
      return 1;
    }
    return -1;
  });

  return <HomePage metadata={metadata} pageIdx={0} pageCnt={config.pageSize}/>;
}
