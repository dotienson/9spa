import laserImg from '../assets/images/service_laser_neutral_1795507810236.jpg';
import skinBoosterImg from '../assets/images/service_booster_neutral_1795507809921.jpg';
import dplImg from '../assets/images/service_dpl_light_1795507167622.jpg';
import acneImg from '../assets/images/service_acne_aquapeel_1795507167123.jpg';
import hairRemovalImg from '../assets/images/service_hair_removal_1795507166827.jpg';
import muscleRelaxImg from '../assets/images/service_relax_neutral_1795507809486.jpg';

export interface ServiceItem {
  id: string;
  index: string;
  category: string;
  title: string;
  headline: string;
  suitability: string;
  technology?: string;
  carouselDescription: string;
  carouselMethod: string;
  image: string;
  imageAlt: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'laser',
    index: '01',
    category: 'Tái tạo chuyên sâu',
    title: 'Laser Tái Tạo & Phục Hồi',
    headline: 'Tái thiết bề mặt da chuẩn y khoa',
    suitability: 'Phù hợp cho trẻ hoá, trị sẹo, tổn thương nổi trên da',
    technology: 'Laser Fractional CO2',
    carouselDescription:
      'Như một làn gió mới đánh thức sức sống tiềm ẩn dưới bề mặt da, liệu trình giúp làm mờ dấu vết thời gian, cải thiện sẹo mụn và xử lý nhẹ nhàng các tổn thương nổi. Bề mặt da dần trở nên phẳng mịn, săn chắc và đồng đều sắc tố theo từng nhịp tái tạo tự nhiên. Mỗi buổi điều trị đều được bác sĩ trực tiếp thăm khám và tinh chỉnh thông số riêng biệt để cân bằng trọn vẹn giữa hiệu quả và độ êm dịu khi phục hồi.',
    carouselMethod:
      'Ứng dụng công nghệ Laser Fractional CO2 vi điểm chuẩn y khoa, tác động chính xác vào vùng mô đích mà vẫn nâng niu và bảo toàn làn da lành xung quanh. Nguồn năng lượng tinh tế kích thích tăng sinh collagen từ sâu bên trong, giúp cấu trúc da được tái thiết bền vững và mịn màng dài lâu.',
    image: laserImg,
    imageAlt: 'Ánh sáng ấm chiếu qua vòm đá travertine mịn, minh hoạ tái tạo bề mặt da',
  },
  {
    id: 'skin-booster',
    index: '02',
    category: 'Cấp ẩm & Phục hồi',
    title: 'Dưỡng Chất Nâng Cấp Da',
    headline: 'Nuôi dưỡng làn da căng bóng từ bên trong',
    suitability: 'Skin Booster với Cấp Độ Cơ Bản Tuỳ Chỉnh và Cao Cấp (R)',
    technology: 'Hoạt chất Skin Booster cá nhân hoá theo phác đồ bác sĩ',
    carouselDescription:
      'Một liệu pháp nuôi dưỡng chuyên sâu tựa như giọt sương mai đánh thức độ căng mọng và rạng rỡ tự nhiên từ sâu bên trong lớp trung bì. Phác đồ Skin Booster được thiết kế linh hoạt từ Cấp Độ Cơ Bản Tuỳ Chỉnh đến Cao Cấp (R), đáp ứng tinh tế từng nhu cầu cấp ẩm, phục hồi hàng rào bảo vệ hay trẻ hoá đa tầng. Sau liệu trình, làn da như được tiếp thêm nguồn sinh khí êm dịu, giữ trọn nét mềm mượt và trong trẻo mỗi sáng thức dậy.',
    carouselMethod:
      'Kết hợp các dòng hoạt chất Skin Booster tinh khiết, nguồn gốc minh bạch cùng kỹ thuật đưa dưỡng chất chuẩn xác do bác sĩ da liễu trực tiếp thực hiện. Từng thành phần được phối hợp cá nhân hoá theo nền da thực tế nhằm tối ưu khả năng hấp thu và mang lại cảm giác nhẹ nhàng, dễ chịu nhất.',
    image: skinBoosterImg,
    imageAlt: 'Giọt nước tinh khiết trên cánh hoa trắng, minh hoạ cấp ẩm và căng bóng da',
  },
  {
    id: 'dpl',
    index: '03',
    category: 'Ánh sáng công nghệ cao',
    title: 'Cải Thiện Nền Da Công Nghệ Cao',
    headline: 'Làm dịu nền da, phục hồi cấu trúc đồng đều',
    suitability: 'Phù hợp cho: Kháng Viêm Trị Mụn; Phục Hồi Cấu Trúc & Giảm Đỏ',
    technology: 'DPL (công nghệ ánh sáng xung động cao cấp)',
    carouselDescription:
      'Dành riêng cho những làn da đang nhạy cảm, dễ ửng đỏ, thâm mụn hoặc thiếu sức sống sau những ngày dài căng thẳng. Liệu trình giúp làm dịu ổ viêm, hỗ trợ kháng viêm trị mụn, giảm đỏ và khôi phục nền da khoẻ khoắn, đều màu hơn qua từng buổi chăm sóc. Không cần thời gian nghỉ dưỡng, bạn có thể nhẹ nhàng trở lại nhịp sống thường nhật với diện mạo tươi tắn và thư thái.',
    carouselMethod:
      'Sử dụng công nghệ ánh sáng xung động phổ hẹp DPL cao cấp, chọn lọc chuẩn xác bước sóng tác động lên sắc tố và hệ mạch máu nông dưới da. Nguồn sáng êm dịu kết hợp cơ chế làm mát bề mặt giúp tái lập cân bằng sinh học và củng cố cấu trúc nền da an toàn, nhẹ nhàng.',
    image: dplImg,
    imageAlt: 'Ánh sáng xung động DPL tinh khiết qua lăng kính quang học',
  },
  {
    id: 'acne-care',
    index: '04',
    category: 'Chăm sóc da liễu',
    title: 'Chăm Sóc Da & Trị Mụn',
    headline: 'Làm sạch sâu và kiểm soát mụn an toàn',
    suitability: 'Chăm sóc nền da chuyên biệt, tối ưu theo từng tình trạng da',
    technology: 'AquaPeel, Laser Fractional CO2 và DPL tuỳ gói',
    carouselDescription:
      'Bắt đầu từ sự thấu hiểu từng lỗ chân lông và nhịp sinh học của làn da, liệu trình giúp làm sạch sâu bụi bẩn, bã nhờn và giải phóng bít tắc một cách êm ái. Dưới góc nhìn y khoa bài bản, các tình trạng mụn ẩn, mụn viêm và vết thâm sau mụn được kiểm soát theo lộ trình khoa học, hạn chế tối đa tổn thương nền da. Làn da dần tìm lại trạng thái thông thoáng, sạch khoẻ và nền tảng vững vàng để hấp thu dưỡng chất tốt hơn.',
    carouselMethod:
      'Phối hợp linh hoạt giữa công nghệ làm sạch thuỷ lực AquaPeel, ánh sáng DPL kháng viêm và Laser Fractional CO2 tuỳ theo từng gói và giai đoạn đáp ứng của da. Mọi bước đều tuân thủ quy trình vô khuẩn nghiêm ngặt, cá nhân hoá bởi bác sĩ da liễu để nuôi dưỡng làn da sạch mụn bền vững.',
    image: acneImg,
    imageAlt: 'Nước tinh khiết và khăn bông trắng tượng trưng cho liệu trình AquaPeel',
  },
  {
    id: 'hair-removal',
    index: '05',
    category: 'Công nghệ ánh sáng lạnh',
    title: 'Triệt Lông Công Nghệ Cao',
    headline: 'Êm dịu trên da, hiệu quả bền vững',
    suitability: 'Từng vùng hoặc tay, chân',
    technology: 'DPL lạnh',
    carouselDescription:
      'Mang đến cảm giác thư thái, mịn màng và tự tin trọn vẹn cho từng vùng cơ thể hay đôi tay, đôi chân thanh thoát. Liệu trình tác động chọn lọc vào nang lông giúp làm mảnh và giảm mọc lại rõ rệt theo từng chu kỳ, đồng thời hỗ trợ bề mặt da sáng mịn và đều màu hơn. Một trải nghiệm nhẹ nhàng, riêng tư để việc chăm sóc bản thân trở thành khoảnh khắc dễ chịu sau một ngày dài.',
    carouselMethod:
      'Ứng dụng công nghệ ánh sáng DPL lạnh tiên tiến với đầu phát làm mát tức thì ngay khi tiếp xúc trên bề mặt da. Nhờ kiểm soát nhiệt độ tối ưu, xung ánh sáng đi sâu hiệu quả vào gốc nang lông mà vẫn giữ trọn cảm giác dịu mát, êm ái kể cả ở những vùng da nhạy cảm.',
    image: hairRemovalImg,
    imageAlt: 'Lụa trắng, đá nhẵn và ly thuỷ tinh mát lạnh tượng trưng cho DPL lạnh',
  },
  {
    id: 'muscle-relaxation',
    index: '06',
    category: 'Trẻ hoá tự nhiên',
    title: 'Thư Giãn Cơ & Trẻ Hoá',
    headline: 'Gìn giữ đường nét thanh thoát, tự nhiên',
    suitability: 'Liên hệ để được tư vấn chi tiết',
    technology: 'Thăm khám và thiết kế liệu trình trực tiếp bởi bác sĩ da liễu',
    carouselDescription:
      'Khi những áp lực thường nhật lặng lẽ hằn lên nét cau mày hay vùng cơ mặt căng cứng, liệu trình mở ra khoảng lặng để các nhóm cơ được thả lỏng và đường nét gương mặt tìm lại sự thanh thoát tự nhiên. Mọi tác động đều hướng đến vẻ đẹp hài hoà, giữ trọn thần thái riêng thay vì làm cứng đơ biểu cảm. Xin liên hệ trực tiếp để bác sĩ thăm khám và đồng hành thiết kế lộ trình tinh tế nhất dành riêng cho bạn.',
    carouselMethod:
      'Liệu trình được xây dựng dựa trên giải phẫu học gương mặt và kinh nghiệm lâm sàng chuyên sâu của bác sĩ da liễu. Từng bước chăm sóc và thư giãn cơ đều được cân chỉnh tỉ mỉ theo cấu trúc khuôn mặt cùng mong muốn cá nhân, đảm bảo sự an toàn tuyệt đối và nét trẻ trung tự nhiên dài lâu.',
    image: muscleRelaxImg,
    imageAlt: 'Dải lụa mềm bay nhẹ trên phiến đá tự nhiên trong ánh nắng ấm, minh hoạ sự thư giãn và trẻ hoá',
  },
];
