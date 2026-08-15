export const statusMap = {
    disapprove: 0,
    approve: 1,
    delete: 2,
};

export const parseDate = (value) => value ? new Date(`${value}T00:00:00.000Z`) : null;