import { ref } from 'vue'

function useBoolean(initValue = false) {
  const bool = ref(initValue)

  function setBool(value: boolean) {
    bool.value = value
  }
  function setTrue() {
    setBool(true)
  }
  function setFalse() {
    setBool(false)
  }
  function toggle() {
    setBool(!bool.value)
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  }
}

function useLoading(initValue = false) {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(initValue)

  return {
    loading,
    startLoading,
    endLoading,
  }
}

function useFetching(initValue = false) {
  const { bool: fetching, setTrue: startFetching, setFalse: endFetching } = useBoolean(initValue)

  return {
    fetching,
    startFetching,
    endFetching,
  }
}

function useSubmitting(initValue = false) {
  const { bool: submitting, setTrue: startSubmitting, setFalse: endSubmitting } = useBoolean(initValue)

  return {
    submitting,
    startSubmitting,
    endSubmitting,
  }
}

function useDeleting(initValue = false) {
  const { bool: deleting, setTrue: startDeleting, setFalse: endDeleting } = useBoolean(initValue)

  return {
    deleting,
    startDeleting,
    endDeleting,
  }
}

function useDownloading(initValue = false) {
  const { bool: downloading, setTrue: startDownloading, setFalse: endDownloading } = useBoolean(initValue)

  return {
    downloading,
    startDownloading,
    endDownloading,
  }
}

function useSearching(initValue = false) {
  const { bool: searching, setTrue: startSearching, setFalse: endSearching } = useBoolean(initValue)

  return {
    searching,
    startSearching,
    endSearching,
  }
}

function useExporting(initValue = false) {
  const { bool: exporting, setTrue: startExporting, setFalse: endExporting } = useBoolean(initValue)

  return {
    searching: exporting,
    startExporting,
    endExporting,
  }
}

function useLoadingFn(fn: () => Promise<void>) {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

  const handleLoadingFn = async () => {
    try {
      startLoading()
      await fn()
    }
    finally {
      endLoading()
    }
  }

  return {
    loading,
    startLoading,
    endLoading,
    handleLoadingFn,
  }
}

export {
  useBoolean,
  useDeleting,
  useDownloading,
  useExporting,
  useFetching,
  useLoading,
  useLoadingFn,
  useSearching,
  useSubmitting,
}
