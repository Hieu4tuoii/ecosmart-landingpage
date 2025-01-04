'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Leaf, Recycle, Award, Smartphone, ChevronDown, Check, ArrowRight, Users } from 'lucide-react'

const CountUp: React.FC<{ end: number; duration?: number }> = ({ end, duration = 3000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: any = null
    const animate = (timestamp: any) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      setCount(Math.floor(percentage * end))
      if (percentage < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{count}</span>
}

const FadeInWhenVisible: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  function removeVietnameseTones(str: string) {
  return str
    .normalize('NFD') // Tách dấu khỏi chữ cái
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
    .replace(/đ/g, 'd') // Chuyển "đ" thành "d"
    .replace(/Đ/g, 'D') // Chuyển "Đ" thành "D"
    .replace(/[^a-zA-Z0-9\s]/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu '-'
    .toLowerCase(); // Chuyển về chữ thường
}
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Header giữ nguyên */}
      <header className="bg-blue-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Leaf className="mr-2" />
            EcoSmart
          </motion.div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['Tính năng', 'Cách thức', 'Lợi ích', 'Đánh giá', 'FAQ'].map((item, index) => (
                <li
                  key={item}
                  className="cursor-pointer hover:text-blue-200 transition duration-300"
                   onClick={() => scrollToSection(removeVietnameseTones(item))}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            <button 
              className="text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
              </svg>
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="#bat-dau" className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">
              Bắt đầu
            </Link>
          </motion.div>
        </div>
        {/* Mobile menu */}
        <motion.div 
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="px-4 pt-2 pb-4 space-y-2">
            {['Tính năng', 'Cách thức', 'Lợi ích', 'Đánh giá', 'FAQ'].map((item) => (
              <li
      key={item}
      className="cursor-pointer hover:text-blue-200 transition duration-300"
      onClick={() => scrollToSection(removeVietnameseTones(item))}
    >
      {item}
    </li>
            ))}
          </ul>
        </motion.div>
      </header>
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <Image src="https://media.canva.com/v2/image-resize/format:PNG/height:900/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FFHKzk%2FMAGa7dFHKzk%2F1%2Fp.png/watermark:F/width:1600?csig=AAAAAAAAAAAAAAAAAAAAANcdP8idSE5SvG9Kmx8WFqvQDBx8TgSHV321nBX-d2cC&exp=1736027535&osig=AAAAAAAAAAAAAAAAAAAAAB_Kwis9j-bf0ebTCpssNrtq7wiw1JurZy5VbJNjBNp9&signer=media-rpc&x-canva-quality=screen_2x" alt="Background" layout="fill" objectFit="cover" className="opacity-10" />
        </motion.div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">EcoSmart: Khởi Đầu Cuộc Cách Mạng Tái Chế</h1>
            <p className="text-lg md:text-xl mb-8">Hãy là người tiên phong trong cuộc cách mạng xanh! Cùng chúng tôi xây dựng tương lai bền vững thông qua công nghệ tái chế thông minh và hệ thống phần thưởng hấp dẫn.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="#dang-ky-som" className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300 inline-flex items-center">
                Đăng Ký Sớm
                <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
  className="md:w-1/2"
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, delay: 0.2 }}
>
  <Image
  alt=''
    src="https://media.canva.com/v2/image-resize/format:PNG/height:900/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FFHKzk%2FMAGa7dFHKzk%2F1%2Fp.png/watermark:F/width:1600?csig=AAAAAAAAAAAAAAAAAAAAANcdP8idSE5SvG9Kmx8WFqvQDBx8TgSHV321nBX-d2cC&exp=1736027535&osig=AAAAAAAAAAAAAAAAAAAAAB_Kwis9j-bf0ebTCpssNrtq7wiw1JurZy5VbJNjBNp9&signer=media-rpc&x-canva-quality=screen_2x"
    width={600}
    height={400}
    className="rounded-lg  w-full scale-150"
  />
</motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tinh-nang" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 id="tinh-nang" className="text-2xl md:text-3xl font-bold text-center mb-12">Tính Năng Sắp Ra Mắt</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Recycle, title: "Thùng Rác Phân Loại", description: "Sử dụng công nghệ tiên tiến để phân loại rác thải" },
              { icon: Award, title: "Hệ Thống Tích Điểm Hấp Dẫn", description: "Nhận điểm thưởng cho mỗi lần tái chế, đổi lấy các phần quà độc đáo" },
              { icon: Smartphone, title: "Ứng Dụng Di Động Tiện Lợi", description: "Theo dõi tác động môi trường của bạn và quản lý phần thưởng dễ dàng" }
            ].map((feature, index) => (
              <FadeInWhenVisible key={index}>
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="cach-thuc" className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 id='cach-thuc' className="text-2xl md:text-3xl font-bold text-center mb-12">Cách Thức EcoSmart Sẽ Hoạt Động</h2>
          </FadeInWhenVisible>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8">
            {[
              { step: 1, title: "Phân Loại Rác", description: "Lựa chọn loại rác thải phù hợp và bỏ vào thùng rác EcoSmart" },
              { step: 2, title: "Quét Mã QR", description: "Sử dụng mã QR do ứng dụng EcoSmart cung cấp để quét ngay tại thùng rác" },
              { step: 3, title: "Nhận Điểm", description: "Tích lũy điểm dựa trên lượng rác thải đã tái chế" },
              { step: 4, title: "Đổi Quà", description: "Sử dụng điểm để đổi lấy các phần thưởng hấp dẫn" }
            ].map((step, index) => (
              <FadeInWhenVisible key={index}>
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md text-center w-64 hover:shadow-lg transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
                >
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">{step.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="loi-ich" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 id='loi-ich' className="text-2xl md:text-3xl font-bold text-center mb-12">Lợi Ích của EcoSmart</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Leaf, title: "Tác Động Môi Trường", description: "Góp phần giảm rác thải chôn lấp và bảo vệ tài nguyên thiên nhiên" },
              { icon: Award, title: "Phần Thưởng Hấp Dẫn", description: "Nhận các ưu đãi độc quyền từ các đối tác của chúng tôi" },
              { icon: Recycle, title: "Nâng Cao Ý Thức", description: "Học cách phân loại rác thải đúng cách và hiểu rõ tầm quan trọng của việc tái chế" },
              { icon: Users, title: "Cộng Đồng Xanh", description: "Tham gia cộng đồng những người tiên phong trong bảo vệ môi trường" }
            ].map((benefit, index) => (
              <FadeInWhenVisible key={index}>
                <motion.div 
                  className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 rounded-full p-3">
                      <benefit.icon className="text-blue-600 w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section (thay thế cho Statistics Section) */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Tầm Nhìn của Chúng Tôi</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <FadeInWhenVisible>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-4xl font-bold mb-2">1 Triệu</div>
                <div className="text-xl">Người dùng trong năm đầu tiên</div>
              </motion.div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-4xl font-bold mb-2">50%</div>
                <div className="text-xl">Giảm rác thải chôn lấp trong 5 năm</div>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="danh-gia" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 id='danh-gia' className="text-2xl md:text-3xl font-bold text-center mb-12">Chuyên Gia Nói Gì Về EcoSmart</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { quote: "EcoSmart có tiềm năng to lớn trong việc thay đổi cách chúng ta nhìn nhận và xử lý rác thải. Đây là một bước tiến quan trọng hướng tới tương lai bền vững.", name: "Nhà báo Dương Ngọc Trinh", title: "" },
              { quote: "Ý tưởng kết hợp công nghệ AI với tái chế là vô cùng sáng tạo. EcoSmart có thể tạo ra một cuộc cách mạng trong quản lý rác thải đô thị.", name: "Đào Việt Anh - Chuyên gia Microsoft", title: "" },
              { quote: "Hệ thống phần thưởng của EcoSmart là một cách thông minh để khuyến khích người dân tham gia tái chế. Đây có thể là chìa khóa để thay đổi thói quen của cộng đồng.", name: "Phạm Ngọc Anh - Hiệp hội doanh nghiệp Châu Âu tại VN", title: "" }
            ].map((testimonial, index) => (
              <FadeInWhenVisible key={index}>
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-gray-500">{testimonial.title}</div>
                    </div>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 id='fqa' className="text-3xl font-bold text-center mb-12">Câu Hỏi Thường Gặp</h2>
          </FadeInWhenVisible>
          <div className="space-y-4">
            {[
              { question: "Khi nào EcoSmart sẽ ra mắt?", answer: "Chúng tôi đang trong giai đoạn phát triển cuối cùng và dự kiến sẽ ra mắt phiên bản beta trong vòng 3 tháng tới. Đăng ký ngay để được thông báo khi chúng tôi chính thức ra mắt!" },
              { question: "Làm thế nào để tôi có thể tham gia sớm vào EcoSmart?", answer: "Bạn có thể đăng ký trở thành người dùng thử nghiệm beta bằng cách điền vào biểu mẫu trên trang web của chúng tôi. Chúng tôi sẽ liên hệ với bạn khi có cơ hội tham gia." },
              { question: "EcoSmart sẽ hoạt động ở những khu vực nào?", answer: "Trong giai đoạn đầu, chúng tôi sẽ triển khai EcoSmart tại một số khu vực đô thị lớn. Chúng tôi có kế hoạch mở rộng nhanh chóng để phục vụ nhiều địa phương hơn trong tương lai gần." }
            ].map((faq, index) => (
              <FadeInWhenVisible key={index}>
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="dang-ky-som" className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hãy Là Người Tiên Phong Cùng EcoSmart!</h2>
            <p className="text-xl mb-8">Đăng ký ngay để trở thành một trong những người đầu tiên trải nghiệm EcoSmart và nhận ưu đãi đặc biệt dành cho người dùng sớm.</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="#" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">Đăng Ký Sớm</Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="#" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-400 transition duration-300">Tìm Hiểu Thêm</Link>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">EcoSmart</h3>
              <p className="text-gray-400">Khởi đầu cuộc cách mạng tái chế thông qua công nghệ thông minh và phần thưởng hấp dẫn.</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h4>
              <ul className="space-y-2">
                <li><Link href="#tinh-nang" className="text-gray-400 hover:text-white transition duration-300">Tính năng</Link></li>
                <li><Link href="#cach-thuc" className="text-gray-400 hover:text-white transition duration-300">Cách thức hoạt động</Link></li>
                <li><Link href="#loi-ich" className="text-gray-400 hover:text-white transition duration-300">Lợi ích</Link></li>
                <li><Link href="#danh-gia" className="text-gray-400 hover:text-white transition duration-300">Đánh giá</Link></li>
                <li><Link href="#faq" className="text-gray-400 hover:text-white transition duration-300">FAQ</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Liên Hệ Chúng Tôi</h4>
              <p className="text-gray-400">Email: ecosmart.hout@gmail.com</p>
              <p className="text-gray-400">Hotline: 0342048097(MS Thanh Quyen)</p>
              <p className="text-gray-400">Địa chỉ: 193 Vinh Hung, HM, HN</p>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4">Theo Dõi Chúng Tôi</h4>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/profile.php?id=61563957609820&mibextid=ZbWKwL" className="text-gray-400 hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width={20} height={20}  viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                </Link>
                <Link href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.tiktok.com%2F%40ecosmart24%3F_t%3DZS-8sn2gbYY1nr%26_r%3D1%26fbclid%3DIwZXh0bgNhZW0CMTAAAR0aZC2zqwYUKUK9YdNeWSBtxPSk7-S5tE64FxB5geT_IWSSNvhU-GhBjDg_aem_uLupapqKX76s2LwfNZlJmw&h=AT0tTi_K1qB_DTM-m8HnwGcI7cqMN3zwxTWWh70X_MbuInEYsFx05hLxvU3RM-wjrZfN056-P32n0aehY1DhFFtMIZ2F0RYd8zEzpaV9uWuT_ecPsn3NU1NAE-7Bz4No1E1KVyGbGZy7hTLzBfpppg" className="text-gray-400 hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill='#ffffff' width={20} height={20}  viewBox="0 0 512 512"><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>
                </Link>
                
               
                
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 EcoSmart. Copyright.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

