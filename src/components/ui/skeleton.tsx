import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@heroui/react";

const SkeletonCard = () => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-4 p-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-20 rounded-lg" />
          <Skeleton className="h-3 w-16 rounded-lg" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </CardHeader>

      <CardBody className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-12 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-12 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-2.5 rounded-lg">
          <Skeleton className="w-6 h-6 rounded-md" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-32 rounded-lg" />
          </div>
        </div>
      </CardBody>

      <CardFooter className="p-4 pt-3">
        <Skeleton className="h-3 w-32 rounded-lg" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
