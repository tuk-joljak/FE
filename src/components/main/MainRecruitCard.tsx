import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

interface MainRecruitCardProps {
  title: string;
  company: string;
  location: string;
}

export function MainRecruitCard({ title, company, location }: MainRecruitCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full"
    >
      <Card className="h-[360px] hover:shadow-lg transition-shadow duration-200 border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50 line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary line-clamp-1">{company}</span>
            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              정규직
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span className="line-clamp-1">{location}</span>
            <span>•</span>
            <span>3년 이상</span>
          </div>
          <div className="text-lg font-semibold text-primary">
            5,000만원 ~ 7,000만원
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              React
            </Badge>
            <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              TypeScript
            </Badge>
            <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Next.js
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
