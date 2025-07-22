class PerformanceMonitor {
    static instance = null;
    metrics = {
        renderTimes: [],
        loadTimes: [],
        interactionTimes: [],
        errors: []
    };

    constructor() {
        if (PerformanceMonitor.instance) {
            return PerformanceMonitor.instance;
        }
        PerformanceMonitor.instance = this;
        this.initializeObservers();
    }

    initializeObservers() {
        // Performance Observer for long tasks
        if ('PerformanceObserver' in window) {
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) {
                        console.warn('Long task detected:', {
                            duration: entry.duration,
                            startTime: entry.startTime,
                            name: entry.name
                        });
                        this.metrics.renderTimes.push({
                            timestamp: Date.now(),
                            duration: entry.duration
                        });
                    }
                });
            });

            longTaskObserver.observe({ entryTypes: ['longtask'] });

            // Layout shifts observer
            const layoutShiftObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.value > 0.1) {
                        console.warn('Significant layout shift detected:', entry);
                    }
                });
            });

            layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

            // First Input Delay observer
            const firstInputObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    this.metrics.interactionTimes.push({
                        timestamp: Date.now(),
                        duration: entry.duration
                    });
                });
            });

            firstInputObserver.observe({ entryTypes: ['first-input'] });
        }

        // Error monitoring
        window.addEventListener('error', (event) => {
            this.metrics.errors.push({
                timestamp: Date.now(),
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno
            });
        });

        // Network request monitoring
        this.interceptNetworkRequests();
    }

    interceptNetworkRequests() {
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const start = performance.now();
            try {
                const response = await originalFetch(...args);
                const duration = performance.now() - start;
                this.metrics.loadTimes.push({
                    timestamp: Date.now(),
                    duration,
                    url: args[0],
                    status: response.status
                });
                return response;
            } catch (error) {
                const duration = performance.now() - start;
                this.metrics.errors.push({
                    timestamp: Date.now(),
                    type: 'network',
                    duration,
                    url: args[0],
                    error: error.message
                });
                throw error;
            }
        };
    }

    getMetrics() {
        return {
            averageRenderTime: this.calculateAverage(this.metrics.renderTimes),
            averageLoadTime: this.calculateAverage(this.metrics.loadTimes),
            averageInteractionTime: this.calculateAverage(this.metrics.interactionTimes),
            errorCount: this.metrics.errors.length,
            recentErrors: this.metrics.errors.slice(-5)
        };
    }

    calculateAverage(items) {
        if (!items.length) return 0;
        const sum = items.reduce((acc, item) => acc + item.duration, 0);
        return sum / items.length;
    }

    clearMetrics() {
        this.metrics = {
            renderTimes: [],
            loadTimes: [],
            interactionTimes: [],
            errors: []
        };
    }
}

export default new PerformanceMonitor();
