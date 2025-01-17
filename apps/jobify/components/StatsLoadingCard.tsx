import { Card, CardHeader, Skeleton } from "@tutorial/shared-lib";

export function StatsLoadingCard(){
    return <Card className="w-[330px] h-[88px]">
        <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                    </div>
                </Skeleton>
            </div>
        </CardHeader>
    </Card>
}

export default StatsLoadingCard;