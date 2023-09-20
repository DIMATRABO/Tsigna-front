export const buildCardsList = (list) => {
  return list.map((card) => {
    return {
      id: card?.id,
      title: card?.template?.title,
      templateId: card?.template?.id,
      templateType: card?.template?.templateType,
      initialTop: parseInt(card?.positionTop),
      initialLeft: parseInt(card?.positionLeft),
      positionTop: parseInt(card?.positionTop),
      positionLeft: parseInt(card?.positionLeft),
      form: card?.fieldValues.map((field) => {
        const templateField = card?.template?.form?.find(
          (tempField) => tempField.key === field.key
        );
        return {
          ...field,
          type: templateField.type,
        };
      }),
      focus: true,
    };
  });
};
export const buildArrowsList = (cards) => {
  let arrows = [];
  cards.forEach((card) => {
    card.form?.forEach((field) => {
      if (field.fromCard) {
        arrows.push({
          id: card?.id + "-" + field.key,
          start: field.value,
          end: card?.id + "-" + field.key,
        });
      }
    });
  });
  return arrows;
};
