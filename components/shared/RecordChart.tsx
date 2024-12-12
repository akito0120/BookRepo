"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {fetchRecords} from "@/lib/actions/user.actions";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#202020",
    },
    mobile: {
        label: "Mobile",
        color: "#636363",
    },
} satisfies ChartConfig

const chartConfig2 = {
    page: {
        label: "Page",
        color: "#202020",
    },
    time: {
        label: "Time",
        color: "#636363",
    },
} satisfies ChartConfig

interface Props {
    records: {
        date: Date,
        page: number,
        time: number
    }[]
}

export default function RecordChart({ records }: Props) {
    const [yearlyData, setYearlyData] = useState<{month: string, page: number, time: number}[]>([]);
    const [monthlyData, setMonthlyData] = useState<{date: string, page: number, time: number}[]>([]);

    function convertToYearlyData() {
        const thisYear = new Date().getFullYear();

        const yearMap = new Map<string, { page: number, time: number}>();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for(const month of months) {
            yearMap.set(month, { page: 0, time: 0 });
        }

        for(const record of records) {
            if(record.date.getFullYear() !== thisYear) continue;
            const currentData = yearMap.get(months[record.date.getMonth()]);
            if(currentData) {
                const { page, time } = currentData;
                yearMap.set(months[record.date.getMonth()], {
                    page: page + record.page,
                    time: time + record.time
                });
            }
        }

        setYearlyData(Array.from(yearMap.entries()).map(e => {
            return {
                month: e[0],
                page: e[1].page,
                time: e[1].time
            }
        }));
    }

    function convertToMonthlyData() {
        const today = new Date();
        const thisYear = today.getFullYear();
        const thisMonth = today.getMonth();

        const monthMap = new Map<number, { page: number, time: number}>();

        const current = new Date(thisYear, thisMonth, 1);
        while(current.getMonth() === thisMonth) {
            monthMap.set(current.getDate(), {
                page: 0,
                time: 0
            });

            current.setDate(current.getDate() + 1);
        }

        for(const record of records) {
            if(record.date.getFullYear() !== thisYear) continue;
            if(record.date.getMonth() !== thisMonth) continue;

            const currentData = monthMap.get(record.date.getDate());
            if(currentData) {
                const { page, time } = currentData;
                monthMap.set(record.date.getDate(), {
                    page: page + record.page,
                    time: time + record.time
                });
            }
        }

        setMonthlyData(Array.from(monthMap.entries()).map(e => {
            return {
                date: e[0].toString(),
                page: e[1].page,
                time: e[1].time
            }
        }));
    }

    useEffect(() => {
        console.log(records);
        convertToYearlyData();
        convertToMonthlyData();
    }, [])

    return (
        <div>
            <div>
                <Tabs defaultValue="month">
                    <TabsList>
                        <TabsTrigger value="year">This Year</TabsTrigger>
                        <TabsTrigger value="month">This Month</TabsTrigger>
                        {/*<TabsTrigger value="week">This Week</TabsTrigger>*/}
                    </TabsList>

                    <TabsContent value="year">
                        <ChartContainer config={chartConfig2} className="h-[430px] w-full mt-3 pr-10">
                            <BarChart accessibilityLayer data={yearlyData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="page" fill="var(--color-page)" radius={4} />
                                <Bar dataKey="time" fill="var(--color-time)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </TabsContent>

                    <TabsContent value="month">
                        <ChartContainer config={chartConfig2} className="h-[430px] w-full mt-3 pr-10">
                            <BarChart accessibilityLayer data={monthlyData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="page" fill="var(--color-page)" radius={4} />
                                <Bar dataKey="time" fill="var(--color-time)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </TabsContent>

                    {/*<TabsContent value="week">*/}
                    {/*    <ChartContainer config={chartConfig} className="h-[430px] w-full mt-3 pr-10">*/}
                    {/*        <BarChart accessibilityLayer data={chartData}>*/}
                    {/*            <CartesianGrid vertical={false} />*/}
                    {/*            <XAxis*/}
                    {/*                dataKey="date"*/}
                    {/*                tickLine={false}*/}
                    {/*                tickMargin={10}*/}
                    {/*                axisLine={false}*/}
                    {/*                tickFormatter={(value) => value}*/}
                    {/*            />*/}
                    {/*            <ChartTooltip content={<ChartTooltipContent />} />*/}
                    {/*            <ChartLegend content={<ChartLegendContent />} />*/}
                    {/*            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />*/}
                    {/*            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />*/}
                    {/*        </BarChart>*/}
                    {/*    </ChartContainer>*/}
                    {/*</TabsContent>*/}
                </Tabs>
            </div>
        </div>

    )
}
