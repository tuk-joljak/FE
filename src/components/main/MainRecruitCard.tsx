import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MainRecruitCardProps {
  title: string;
  company: string;
  location: string;
}

export function MainRecruitCard({
  title,
  company,
  location,
}: MainRecruitCardProps) {
    
  return (
    <Card className="w-[200px] h-[300px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <CardContent>
        {location}
      </CardContent>
      <CardFooter className="center">
        <Button className="w-full">공고 보기</Button>
      </CardFooter>
    </Card>
  );
}
