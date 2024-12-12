import {currentUser} from "@clerk/nextjs/server";
import {fetchRecords, fetchUser} from "@/lib/actions/user.actions";
import RecordTable from "@/components/shared/RecordTable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RecordChart from "@/components/shared/RecordChart";
import {redirect} from "next/navigation";


export default async function Page() {
    const user = await currentUser();

    if(!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    const records = await fetchRecords(user.id);
    console.log(records);

    const data = records.map((record: any) => {
        return {
            date: record.date,
            page: record.page,
            time: record.time
        }
    });



    return (
        <div className="px-10 py-5">
            <div className="w-full my-7 flex gap-5 pr-10">
                <div className="text-3xl font-bold text-gray-900 underline underline-offset-2 px-5">ACTIVITIES</div>
            </div>
            <div className="px-5 pt-1">
                <Tabs defaultValue="table">
                    <TabsList>
                        <TabsTrigger value="table">Table View</TabsTrigger>
                        <TabsTrigger value="chart">Chart View</TabsTrigger>
                    </TabsList>
                    <TabsContent value="table">
                        <div className="px-3 py-5">
                            <RecordTable/>
                        </div>
                    </TabsContent>
                    <TabsContent value="chart">
                        <div className="">
                            <RecordChart records={data}/>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}