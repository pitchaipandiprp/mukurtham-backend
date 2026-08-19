import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = 1;

const events = [
    // =====================================================
    // 2026 - VALARPIRAI MUHURTHAM
    // =====================================================

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-08-23" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-09-13" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-09-17" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-10-25" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-11-11" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-11-13" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-11-15" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-11-16" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-11-20" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-12-10" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-12-13" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2026-12-14" },


    // =====================================================
    // 2026 - THEIPIRAI MUHURTHAM
    // =====================================================

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2026-08-30" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2026-08-31" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2026-09-07" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2026-11-01" },


    // =====================================================
    // 2026 - HOLIDAYS
    // =====================================================

    { date_type: "Holiday", event_name: "Milad-un-Nabi", date: "2026-08-26" },
    { date_type: "Holiday", event_name: "Krishna Jayanthi", date: "2026-09-04" },
    { date_type: "Holiday", event_name: "Vinayakar Chathurthi", date: "2026-09-14" },
    { date_type: "Holiday", event_name: "Gandhi Jayanthi", date: "2026-10-02" },
    { date_type: "Holiday", event_name: "Ayutha Pooja", date: "2026-10-19" },
    { date_type: "Holiday", event_name: "Vijaya Dasami", date: "2026-10-20" },
    { date_type: "Holiday", event_name: "Deepavali", date: "2026-11-08" },
    { date_type: "Holiday", event_name: "Christmas", date: "2026-12-25" },


    // =====================================================
    // 2027 - VALARPIRAI MUHURTHAM
    // =====================================================

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-01-14" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-02-25" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-02-26" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-03-17" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-03-18" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-03-24" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-03-25" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-04-11" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-04-12" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-04-18" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-04-23" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-04-25" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-04-26" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-05-16" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-05-17" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-05-23" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-05-26" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-05-27" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-05-28" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-06-13" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-06-14" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-06-23" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-06-24" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-06-25" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-08-20" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-09-05" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-09-12" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-09-13" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-11-05" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-11-08" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-11-10" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-11-11" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-11-12" },

    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-12-08" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-12-09" },
    { date_type: "Waxing", event_name: "Valarpirai Muhurtham", date: "2027-12-10" },


    // =====================================================
    // 2027 - THEIPIRAI MUHURTHAM
    // =====================================================

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-02-08" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-02-10" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-02-11" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-02-12" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-02-18" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-03-04" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-03-10" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-03-11" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-03-12" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-03-15" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-04-01" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-04-04" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-04-08" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-05-03" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-05-09" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-05-12" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-06-07" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-06-10" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-07-05" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-07-07" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-07-09" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-07-14" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-07-16" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-08-22" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-08-23" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-08-27" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-08-29" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-09-03" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-10-20" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-10-22" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-10-27" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-11-01" },

    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-12-02" },
    { date_type: "Waning", event_name: "Theipirai Muhurtham", date: "2027-12-05" },


    // =====================================================
    // 2027 - HOLIDAYS
    // =====================================================

    { date_type: "Holiday", event_name: "New Year's Day", date: "2027-01-01" },
    { date_type: "Holiday", event_name: "Pongal", date: "2027-01-15" },
    { date_type: "Holiday", event_name: "Thiruvalluvar Day", date: "2027-01-15" },
    { date_type: "Holiday", event_name: "Uzhavar Thirunal", date: "2027-01-16" },
    { date_type: "Holiday", event_name: "Thai Poosam", date: "2027-01-23" },
    { date_type: "Holiday", event_name: "Republic Day", date: "2027-01-26" },

    { date_type: "Holiday", event_name: "Ramzan", date: "2027-03-10" },
    { date_type: "Holiday", event_name: "Good Friday", date: "2027-03-26" },

    { date_type: "Holiday", event_name: "Telugu New Year's Day", date: "2027-04-08" },
    { date_type: "Holiday", event_name: "Tamil New Year's Day", date: "2027-04-14" },
    { date_type: "Holiday", event_name: "Dr. B.R. Ambedkar's Birthday", date: "2027-04-14" },

    { date_type: "Holiday", event_name: "May Day", date: "2027-05-01" },

    { date_type: "Holiday", event_name: "Bakrid", date: "2027-05-17" },
    { date_type: "Holiday", event_name: "Muharram", date: "2027-06-17" },

    { date_type: "Holiday", event_name: "Independence Day", date: "2027-08-15" },
    { date_type: "Holiday", event_name: "Milad-un-Nabi", date: "2027-08-25" },

    { date_type: "Holiday", event_name: "Vinayakar Chathurthi", date: "2027-09-04" },
    { date_type: "Holiday", event_name: "Gandhi Jayanthi", date: "2027-10-02" },

    { date_type: "Holiday", event_name: "Ayutha Pooja", date: "2027-10-27" },
    { date_type: "Holiday", event_name: "Vijaya Dasami", date: "2027-10-28" },

    { date_type: "Holiday", event_name: "Deepavali", date: "2027-10-29" },

    { date_type: "Holiday", event_name: "Christmas", date: "2027-12-25" },
];

const data = events.map((event) => ({
    user_id: userId,

    date_type: event.date_type,
    event_name: event.event_name,

    from_date: new Date(event.date),
    to_date: new Date(event.date),

    status: 1,

    created_by: userId,
    updated_by: userId,

    created_at: new Date(),
    updated_at: new Date(),
}));

async function serviceDateSeeder(prisma) {
    await prisma.serviceDate.createMany({
        data: data,
        skipDuplicates: true,
    });

    console.log("Service Date seeded successfully.");
}

export default serviceDateSeeder;

