/**
 * Date and Time Formatting Utilities
 */

/**
 * Format date to readable string
 * @param {Date|string|number} date
 * @param {string} format - 'short', 'medium', 'long', 'full'
 * @returns {string}
 */
export const formatDate = (date, format = 'medium') => {
    const d = new Date(date);

    const options = {
        short: { month: 'short', day: 'numeric' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
        full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    };

    return d.toLocaleDateString('en-US', options[format] || options.medium);
};

/**
 * Format time to readable string
 * @param {Date|string|number} date
 * @param {boolean} includeSeconds
 * @returns {string}
 */
export const formatTime = (date, includeSeconds = false) => {
    const d = new Date(date);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        ...(includeSeconds && { second: '2-digit' })
    };

    return d.toLocaleTimeString('en-US', options);
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date|string|number} date
 * @returns {string}
 */
export const getRelativeTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};

/**
 * Format duration in seconds to readable string
 * @param {number} seconds
 * @param {boolean} short - Use short format (e.g., "1h 30m" vs "1 hour 30 minutes")
 * @returns {string}
 */
export const formatDuration = (seconds, short = false) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];

    if (hours > 0) {
        parts.push(`${hours}${short ? 'h' : ` hour${hours > 1 ? 's' : ''}`}`);
    }
    if (minutes > 0) {
        parts.push(`${minutes}${short ? 'm' : ` minute${minutes > 1 ? 's' : ''}`}`);
    }
    if (secs > 0 && !hours) {
        parts.push(`${secs}${short ? 's' : ` second${secs > 1 ? 's' : ''}`}`);
    }

    return parts.join(' ') || (short ? '0s' : '0 seconds');
};

/**
 * Number Formatting Utilities
 */

/**
 * Format number with thousand separators
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format number as percentage
 * @param {number} num - Number between 0 and 1 or 0 and 100
 * @param {number} decimals
 * @param {boolean} normalize - If true, assumes num is between 0-1
 * @returns {string}
 */
export const formatPercentage = (num, decimals = 0, normalize = false) => {
    const value = normalize ? num * 100 : num;
    return `${value.toFixed(decimals)}%`;
};

/**
 * Format number as currency
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
};

/**
 * Shorten large numbers (e.g., 1000 -> 1K, 1000000 -> 1M)
 * @param {number} num
 * @returns {string}
 */
export const shortenNumber = (num) => {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1) + 'B';
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M';
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'K';
    }
    return num.toString();
};

/**
 * String Utilities
 */

/**
 * Truncate string with ellipsis
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (str, maxLength = 50) => {
    if (!str || str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert to title case
 * @param {string} str
 * @returns {string}
 */
export const toTitleCase = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
};

/**
 * Generate initials from name
 * @param {string} name
 * @param {number} max - Maximum number of initials
 * @returns {string}
 */
export const getInitials = (name, max = 2) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .filter(Boolean)
        .slice(0, max)
        .join('')
        .toUpperCase();
};

/**
 * Array Utilities
 */

/**
 * Shuffle array randomly
 * @param {Array} array
 * @returns {Array}
 */
export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/**
 * Get random item from array
 * @param {Array} array
 * @returns {*}
 */
export const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * Group array by key
 * @param {Array} array
 * @param {string|Function} key
 * @returns {Object}
 */
export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        (result[groupKey] = result[groupKey] || []).push(item);
        return result;
    }, {});
};

/**
 * Miscellaneous Utilities
 */

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function
 * @param {Function} func
 * @param {number} limit
 * @returns {Function}
 */
export const throttle = (func, limit = 300) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Generate unique ID
 * @param {string} prefix
 * @returns {string}
 */
export const generateId = (prefix = 'id') => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Copy text to clipboard
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

/**
 * Download file from blob
 * @param {Blob} blob
 * @param {string} filename
 */
export const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

/**
 * Calculate score level
 * @param {number} score - Score out of 100
 * @returns {Object} {level, color, label}
 */
export const getScoreLevel = (score) => {
    if (score >= 90) return { level: 'excellent', color: 'emerald', label: 'Excellent' };
    if (score >= 75) return { level: 'good', color: 'blue', label: 'Good' };
    if (score >= 60) return { level: 'average', color: 'amber', label: 'Average' };
    return { level: 'needs_improvement', color: 'rose', label: 'Needs Improvement' };
};
