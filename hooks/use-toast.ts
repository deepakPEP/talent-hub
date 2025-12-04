export interface Toast {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function toast(props: Toast) {
  // Simple browser notification fallback
  if (typeof window !== 'undefined') {
    const message = props.title ? `${props.title}${props.description ? ': ' + props.description : ''}` : props.description || '';
    
    // Try to use browser notification API
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(props.title || 'Notification', {
        body: props.description || '',
        tag: 'app-notification',
      });
    } else {
      // Fallback to console for development
      console.log('[Toast]', message);
    }
  }
}
