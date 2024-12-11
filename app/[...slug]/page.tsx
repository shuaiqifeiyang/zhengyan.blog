import { get_files_metadata_in_a_folder } from "@/utils";
import config from "@/config/config"
export const dynamicParams = false;
export async function generateStaticParams() {
    const metadata = await get_files_metadata_in_a_folder("./md");
    const fileCnt = metadata.length;
    const pageSize = config.pageSize
    const res = [];
    let i = 0;
    console.log(fileCnt);
    console.log(pageSize);
    while(fileCnt-i*pageSize > 0){
        res.push({slug: [String(i+1)]});
        i+=1;
    }
    console.log(res);
    return res;
}

export default function Page({ params }: { params: { slug: string[] } }) {
    return <div>{params.slug[0]}</div>
}
