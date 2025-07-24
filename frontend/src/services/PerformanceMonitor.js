class PerformanceMonitor {
    static metrics = {
        loadTimes: [],
        longTasks: [],
        layoutShifts: [],
    };

    static init() {
        // Debounce the reporting of long tasks
        let longTaskTimeout;
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                clearTimeout(longTaskTimeout);
                longTaskTimeout = setTimeout(() => {
                    if (entry.duration > 100) { // Only log tasks longer than 100ms
                        this.metrics.longTasks.push({
                            duration: entry.duration,
                            startTime: entry.startTime,
                            name: entry.name
                        });
                        console.debug('Long task detected:', entry);
                    }
                }, 1000);
            });
        });
        observer.observe({ entryTypes: ['longtask'] });

        // Track layout shifts with a minimum threshold
        const layoutObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.value > 0.1) { // Only track significant shifts
                    this.metrics.layoutShifts.push({
                        value: entry.value,
                        timeStamp: entry.startTime
                    });
                    console.debug('Layout shift detected:', entry.value.toFixed(3));
                }
            });
        });
        layoutObserver.observe({ entryTypes: ['layout-shift'] });
    }

    static getMetrics() {
        return {
            averageLoadTime: this.calculateAverageLoadTime(),
            totalLongTasks: this.metrics.longTasks.length,
            totalLayoutShifts: this.metrics.layoutShifts.length
        };
    }

    static calculateAverageLoadTime() {
        if (this.metrics.loadTimes.length === 0) return 0;
        const sum = this.metrics.loadTimes.reduce((acc, curr) => acc + curr.duration, 0);
        return sum / this.metrics.loadTimes.length;
    }

    static clearMetrics() {
        this.metrics = {
            loadTimes: [],
            longTasks: [],
            layoutShifts: []
        };
    }
}

// Initialize performance monitoring
PerformanceMonitor.init();

export default PerformanceMonitor;
