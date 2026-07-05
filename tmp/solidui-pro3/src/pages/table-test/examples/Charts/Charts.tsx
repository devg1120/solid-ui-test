/*
import { Button } from "~/components/ui/button"
 
export function Element() {
  return (
    <div class="grid max-w-md grid-cols-3 gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
*/

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { LineChart } from "~/components/ui/charts"

export function LineChartDemo() {
  const chartData = {
    labels: [
      "Jan 22",
      "Feb 22",
      "Mar 22",
      "Apr 22",
      "May 22",
      "Jun 22",
      "Jul 22",
      "Aug 22",
      "Sep 22",
      "Oct 22",
      "Nov 22",
      "Dec 22"
    ],
    datasets: [
      {
        label: "SemiAnalysis",
        data: [2890, 2756, 3322, 3470, 3475, 3129, 3490, 2903, 2643, 2837, 2954, 3239],
        fill: true
      },
      {
        label: "The Pragmatic Engineer",
        data: [2338, 2103, 2194, 2108, 1812, 1726, 1982, 2012, 2342, 2473, 3848, 3736],
        fill: true
      }
    ]
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter revenue over time (USD)</CardTitle>
      </CardHeader>
      <CardContent class="h-64 w-[500px] max-w-full">
        <LineChart data={chartData} />
      </CardContent>
    </Card>
  )
}

//import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { PieChart } from "~/components/ui/charts"
 
export function PieChartDemo() {
  const chartData = {
    labels: ["New York", "London", "Hong Kong", "San Francisco", "Singapore", "Zurich"],
    datasets: [
      {
        data: [9800, 4567, 3908, 2400, 1908, 1398]
      }
    ]
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent class="size-[200px]">
        <PieChart data={chartData} />
      </CardContent>
    </Card>
  )
}

//import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { BarChart } from "~/components/ui/charts"

export function BarChartDemo() {
  const chartData = {
    labels: ["Amphibians", "Birds", "Crustaceans", "Ferns", "Arachnids", "Corals", "Algae"],
    datasets: [
      {
        label: "Number of threatened species",
        data: [2488, 1445, 734, 281, 251, 232, 98]
      }
    ]
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent class="h-64 w-[500px] max-w-full">
        <BarChart data={chartData} />
      </CardContent>
    </Card>
  )
}
