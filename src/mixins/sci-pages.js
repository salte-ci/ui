export function PageMixin(superClass) {
  return class extends superClass {
    show(animate) {
      if (animate) {
        return this.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
      }
    }

    hide() {
      return this.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }).then((animation) => {
        if (animation) animation.cancel();
      });
    }

    animate(...args) {
      if (super.animate) {
        const animation = super.animate(...args);

        return new Promise((resolve, reject) => {
          animation.onfinish = () => resolve(animation);
          animation.oncancel = reject;
        });
      }

      return Promise.resolve();
    }
  }
}
