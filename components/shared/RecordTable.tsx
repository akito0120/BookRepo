import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchBooks, fetchRecords, fetchUser} from "@/lib/actions/user.actions";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";


export default async function RecordTable() {
    const user = await currentUser();
    if(!user) {
        return null;
    }

    const records = await fetchRecords(user.id);

    return (
        <Table>
            <TableCaption>A list of your activities.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {records.map((record: any) => (
                    <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.date.toLocaleDateString()}</TableCell>
                        <TableCell>{record.title}</TableCell>
                        <TableCell>{record.author}</TableCell>
                        <TableCell>{record.page}</TableCell>
                        <TableCell>{record.time}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}