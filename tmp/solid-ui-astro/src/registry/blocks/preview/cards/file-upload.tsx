import { IconPlaceholder } from "~/components/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"

export function FileUpload() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>Drag and drop or browse</CardDescription>
      </CardHeader>
      <CardContent>
        <Empty class="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconPlaceholder lucide="UploadCloudIcon" tabler="IconCloudUpload" />
            </EmptyMedia>
            <EmptyTitle>Upload files</EmptyTitle>
            <EmptyDescription>PNG, JPG, PDF up to 10MB</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Browse Files</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
