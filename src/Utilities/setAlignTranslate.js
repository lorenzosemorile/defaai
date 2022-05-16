export const setAlignTranslate = (alignment) => {
  if (alignment.id === 'center') return '';
  if (alignment.id === 'left') return 'translate(-20%)';
  if (alignment.id === 'right') return 'translate(20%)';
}