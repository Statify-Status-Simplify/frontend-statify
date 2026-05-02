import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Copy, Globe, Wifi } from 'lucide-react'

interface CreateMonitorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type MonitorType = null | 'website' | 'iot'
type DialogStep = 'type' | 'config'

export function CreateMonitorDialog({
  open,
  onOpenChange,
}: CreateMonitorDialogProps) {
  const [step, setStep] = useState<DialogStep>('type')
  const [monitorType, setMonitorType] = useState<MonitorType>(null)
  const [url, setUrl] = useState('')
  const [interval, setInterval] = useState('5')
  const [webhookCopied, setWebhookCopied] = useState(false)

  const webhookUrl = 'https://api.statify.io/webhooks/heartbeat/abc123def456'

  const handleMonitorTypeSelect = (type: MonitorType) => {
    setMonitorType(type)
    setStep('config')
  }

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl)
    setWebhookCopied(true)
    setTimeout(() => setWebhookCopied(false), 2000)
  }

  const handleReset = () => {
    setStep('type')
    setMonitorType(null)
    setUrl('')
    setInterval('5')
    setWebhookCopied(false)
  }

  const handleCreateMonitor = () => {
    // Simulate monitor creation
    alert(`Monitor created: ${monitorType === 'website' ? url : 'Webhook'} (${interval}min interval)`)
    handleReset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {step === 'type' ? (
          <>
            <DialogHeader>
              <DialogTitle>Create New Monitor</DialogTitle>
              <DialogDescription>
                Choose the type of monitor you want to create
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-6">
              {/* Website/API Option */}
              <button
                onClick={() => handleMonitorTypeSelect('website')}
                className="relative rounded-lg border-2 border-gray-700 p-6 hover:border-primary hover:bg-background/50 transition-all group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left w-full">
                    <h3 className="font-semibold text-foreground">
                      Website / API
                    </h3>
                    <p className="text-xs text-muted">
                      Active HTTP Pull monitoring
                    </p>
                  </div>
                </div>
              </button>

              {/* IoT/Heartbeat Option */}
              <button
                onClick={() => handleMonitorTypeSelect('iot')}
                className="relative rounded-lg border-2 border-gray-700 p-6 hover:border-primary hover:bg-background/50 transition-all group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Wifi className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left w-full">
                    <h3 className="font-semibold text-foreground">
                      IoT / Cron Job
                    </h3>
                    <p className="text-xs text-muted">
                      Passive Heartbeat Push monitoring
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {monitorType === 'website'
                  ? 'Configure Website Monitor'
                  : 'Configure IoT Monitor'}
              </DialogTitle>
              <DialogDescription>
                {monitorType === 'website'
                  ? 'Enter the URL of the website or API endpoint you want to monitor'
                  : 'Use the webhook URL to push heartbeat signals from your IoT device'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-6">
              {monitorType === 'website' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Website URL
                    </label>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Check Interval
                    </label>
                    <select className="w-full h-10 rounded-md border border-gray-700 bg-secondary px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="1">Every 1 minute</option>
                      <option value="5" selected>
                        Every 5 minutes
                      </option>
                      <option value="10">Every 10 minutes</option>
                      <option value="30">Every 30 minutes</option>
                      <option value="60">Every 1 hour</option>
                    </select>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Webhook URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={webhookUrl}
                      readOnly
                      className="text-xs"
                    />
                    <Button
                      onClick={handleCopyWebhook}
                      size="icon"
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {webhookCopied && (
                    <p className="text-xs text-success">
                      Webhook URL copied to clipboard!
                    </p>
                  )}
                  <p className="text-xs text-muted pt-2">
                    Send a POST request to this URL to push heartbeat signals.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-gray-700">
              <Button
                variant="outline"
                onClick={() => {
                  handleReset()
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleCreateMonitor}
                disabled={monitorType === 'website' && !url}
              >
                Create Monitor
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { CreateMonitorDialog }
