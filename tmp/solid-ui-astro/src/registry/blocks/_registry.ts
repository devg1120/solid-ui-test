import type { Registry } from "~/registry/schema"

export const blocks: Registry["items"] = [
  {
    name: "preview",
    title: "Preview",
    type: "registry:block",
    registryDependencies: [
      "alert",
      "alert-dialog",
      "avatar",
      "badge",
      "button",
      "button-group",
      "card",
      "chart",
      "checkbox",
      "combobox",
      "dialog",
      "dropdown-menu",
      "empty",
      "field",
      "input",
      "input-group",
      "item",
      "kbd",
      "label",
      "native-select",
      "popover",
      "progress",
      "radio-group",
      "select",
      "separator",
      "sheet",
      "skeleton",
      "slider",
      "spinner",
      "switch",
      "table",
      "tabs",
      "textarea",
      "toggle-group",
      "tooltip",
      "example"
    ],
    files: [
      {
        path: "blocks/preview/index.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/activate-agent-dialog.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/analytics-card.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/anomaly-alert.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/bar-chart-card.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/book-appointment.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/codespaces-card.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/contributions-activity.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/contributors.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/environment-variables.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/feedback-form.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/file-upload.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/github-profile.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/icon-preview-grid.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/invite-team.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/invoice.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/live-waveform.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/no-team-members.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/not-found.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/observability-card.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/pie-chart-card.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/report-bug.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/shipping-address.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/shortcuts.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/skeleton-loading.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/sleep-report.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/style-overview.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/typography-specimen.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/ui-elements.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/usage-card.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/visitors.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview/cards/weekly-fitness-summary.tsx",
        type: "registry:block"
      }
    ]
  },
  {
    name: "preview-02",
    title: "Preview 02",
    type: "registry:block",
    registryDependencies: [
      "accordion",
      "badge",
      "breadcrumb",
      "button",
      "calendar",
      "card",
      "chart",
      "checkbox",
      "combobox",
      "dropdown-menu",
      "empty",
      "field",
      "input",
      "input-group",
      "item",
      "label",
      "native-select",
      "progress",
      "radio-group",
      "select",
      "separator",
      "sidebar",
      "skeleton",
      "slider",
      "spinner",
      "switch",
      "table",
      "tabs",
      "textarea",
      "toggle-group"
    ],
    files: [
      {
        path: "blocks/preview-02/index.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/account-access.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/card-overview.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/claimable-balance.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/contribution-history.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/cover-art.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/dividend-income.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/empty-connect-bank.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/empty-distribute-track.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/empty-explore-catalog.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/faq.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/front-door.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/index-investing.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/kitchen-island.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/loading-card.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/new-milestone.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/notification-settings.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/payments.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/payout-threshold.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/power-usage.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/preferences.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/qr-connect.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/receiving-method.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/recent-transactions.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/release-catalog.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/roller-shades.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/savings-progress.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/savings-targets.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/sidebar-nav.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/social-links.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/stock-performance.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/syncing-state.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/transfer-funds.tsx",
        type: "registry:block"
      },
      {
        path: "blocks/preview-02/cards/upcoming-payments.tsx",
        type: "registry:block"
      }
    ]
  }
]
